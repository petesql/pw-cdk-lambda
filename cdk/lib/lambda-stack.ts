import { Stack, StackProps, Construct, } from '@aws-cdk/core';
import events = require('@aws-cdk/aws-events');
import targets = require('@aws-cdk/aws-events-targets');
import lambda = require('@aws-cdk/aws-lambda');
import iam = require('@aws-cdk/aws-iam');
import fs = require('fs');
import cdk = require('@aws-cdk/core');

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambdaFn = new lambda.Function(this, 'sig', {
      code: new lambda.InlineCode(fs.readFileSync('lambda/lambda-handler.py', { encoding: 'utf-8' })),
      handler: 'lambdba-stack.main',
      timeout: cdk.Duration.seconds(300),
      runtime: lambda.Runtime.PYTHON_3_6,
    });

    lambdaFn.addToRolePolicy(new iam.PolicyStatement({
      actions: [
        'ec2:DescribeInstances',
        'ec2:StartInstances',
        'ec2:StopInstances'
      ],
      resources: ['*']
    }));

    const rule = new events.Rule(this, 'Rule', {
      schedule: events.Schedule.expression('cron(0 18 ? * MON-FRI *)')
    });

    rule.addTarget(new targets.LambdaFunction(lambdaFn));

  }
}
