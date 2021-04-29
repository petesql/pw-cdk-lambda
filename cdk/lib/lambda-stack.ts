import { Stack, StackProps, Construct, } from '@aws-cdk/core';
import { ManagedPolicy, User } from '@aws-cdk/aws-iam';

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const user = new User(this, 'simpleuser', {
      userName: 'pw-simple-user',
      managedPolicies: [ 
        ManagedPolicy.fromManagedPolicyArn(this,'ropol', 'arn:aws:iam::aws:policy/ReadOnlyAccess'),
      ]
    });
  }
}
