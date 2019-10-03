import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { config } from 'dotenv';

config();

chai.use(chaiHttp);
