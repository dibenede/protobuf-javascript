import googleProtobuf from 'google-protobuf';
import * as test7_pb from './test7/test7_pb.mjs';

const global = globalThis;
googleProtobuf.exportSymbol('jspb.Message', googleProtobuf.Message, global);
googleProtobuf.exportSymbol('proto.jspb.test.framing.FramingMessage', test7_pb.FramingMessage, global);

describe('Import test suite', () => {
  it('testImportedMessage', () => {
    const framing1 = new proto.jspb.test.framing.FramingMessage([]);
    const framing2 = new proto.jspb.test.framing.FramingMessage([]);
    expect(framing1.toObject()).toEqual(framing2.toObject());
  });
});
