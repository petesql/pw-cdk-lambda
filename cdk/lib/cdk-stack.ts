import * as cdk from '@aws-cdk/core';
import { ManagedPolicy, User } from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const user = new User(this, 'simpleuser', {
      userName: 'pw-simple-user',
      managedPolicies: [ 
        ManagedPolicy.fromManagedPolicyArn(this,'ropol', 'arn:aws:iam::aws:policy/ReadOnlyAccess'),
      ]
    });
  }
}
