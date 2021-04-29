#!/usr/bin/env node
import 'source-map-support/register';
import { App } from '@aws-cdk/core';
import { LambdaStack } from '../lib/lambda-stack';

const app = new App();
new LambdaStack(app, 'CdkStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: 'eu-west-2' },
});
