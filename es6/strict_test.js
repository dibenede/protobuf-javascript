import googleProtobuf from 'google-protobuf';
import * as test9_pb from './protos/test9_pb.mjs';
import * as test10_pb from './protos/test10_pb.mjs';

const global = globalThis;

describe('Strict test suite', () => {
  it('testImportedMessage', () => {
    const simple1 = new test9_pb.Simple9()
    const simple2 = new test9_pb.Simple9()
    expect(simple1.toObject()).toEqual(simple2.toObject());
  });

  it('testGlobalScopePollution', () => {
    expect(global.jspb.exttest).toBeUndefined();
  });

  describe('with imports', () => {
    it('testImportedMessage', () => {
      const simple1 = new test10_pb.Simple10()
      const simple2 = new test10_pb.Simple10()
      expect(simple1.toObject()).toEqual(simple2.toObject());
    });

    it('testGlobalScopePollution', () => {
      expect(global.jspb.exttest).toBeUndefined();
    });
  });
});
