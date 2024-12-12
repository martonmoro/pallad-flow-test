import {
  Credential,
  Presentation,
  PresentationRequest,
} from "mina-credentials";
import { Field, Signature } from "o1js";

type PresentationRequestPayload = {
  presentationRequest: string;
  selectedCredentials: string[];
  verifierIdentity:
    | string
    | {
        address: string;
        tokenId: string;
        network: "devnet" | "mainnet";
      };
};

async function run(): Promise<void> {
  // const originalPayload =
  //   '{"verifierIdentity":"http://localhost:5173","presentationRequest":{"type":"https","spec":{"inputs":{"credential":{"type":"credential","credentialType":"simple","witness":{"type":{"_type":"Constant","value":"simple"},"issuer":{"_type":"PublicKey"},"issuerSignature":{"_type":"Signature"}},"data":{"_type":"DynamicRecord","_isFactory":true,"maxEntries":20,"knownShape":{"nationality":{"_type":"DynamicString","_isFactory":true,"maxLength":50},"expiresAt":{"_type":"UInt64"},"id":{"_type":"Bytes","size":16}}}},"acceptedNations":{"type":"claim","data":{"_type":"DynamicArray","_isFactory":true,"maxLength":100,"innerType":{"_type":"Field"}}},"acceptedIssuers":{"type":"claim","data":{"_type":"DynamicArray","_isFactory":true,"maxLength":100,"innerType":{"_type":"Field"}}},"currentDate":{"type":"claim","data":{"_type":"UInt64"}},"appId":{"type":"claim","data":{"_type":"DynamicString","_isFactory":true,"maxLength":50}}},"logic":{"assert":{"type":"and","inputs":[{"type":"equalsOneOf","input":{"type":"hash","inputs":[{"type":"property","key":"nationality","inner":{"type":"property","key":"data","inner":{"type":"property","key":"credential","inner":{"type":"root"}}}}],"prefix":null},"options":{"type":"property","key":"acceptedNations","inner":{"type":"root"}}},{"type":"equalsOneOf","input":{"type":"issuer","credentialKey":"credential"},"options":{"type":"property","key":"acceptedIssuers","inner":{"type":"root"}}},{"type":"lessThanEq","left":{"type":"property","key":"currentDate","inner":{"type":"root"}},"right":{"type":"property","key":"expiresAt","inner":{"type":"property","key":"data","inner":{"type":"property","key":"credential","inner":{"type":"root"}}}}}]},"outputClaim":{"type":"record","data":{"nullifier":{"type":"hash","inputs":[{"type":"property","key":"data","inner":{"type":"property","key":"credential","inner":{"type":"root"}}},{"type":"property","key":"appId","inner":{"type":"root"}}],"prefix":null}}}}},"claims":{"acceptedNations":{"_type":"DynamicArray","_isFactory":true,"maxLength":100,"innerType":{"_type":"Field"},"value":[{"_type":"Field","value":"1535750191209038276491867256345743424918048468505871420482779334664484555622"},{"_type":"Field","value":"22047996538609280301110666364818369992447508174403408199422649676981322383447"},{"_type":"Field","value":"24056497251096418057564183210090983888753346776669738257197194846336719337693"}]},"acceptedIssuers":{"_type":"DynamicArray","_isFactory":true,"maxLength":100,"innerType":{"_type":"Field"},"value":[{"_type":"Field","value":"5829798620528221164923475031411230726737474930308766915907721384085934614251"},{"_type":"Field","value":"22272326066070346302181355471642228895021114735537987149163045306117362247163"},{"_type":"Field","value":"28847437109329576273273699361208638635072195817455078955021492954147148718403"}]},"currentDate":{"_type":"UInt64","value":"1733918837371"},"appId":{"_type":"DynamicString","_isFactory":true,"maxLength":50,"value":"my-app-id:123"}},"inputContext":{"type":"https","action":"my-app-id:123:authenticate","serverNonce":{"_type":"Field","value":"17107116096673349503346389785413950052660281203260762106134117160043867421914"}}},"selectedCredentials":[{"version":"v0","witness":{"type":"simple","issuer":{"_type":"PublicKey","value":"B62qqBRH3tNvmZUwY6it6SAaiS2Mx1Zi2NqExvsRqNNJZFbZ2SZo34j"},"issuerSignature":{"_type":"Signature","value":{"r":"12237368200570544388756696197527812988602072545762708510637606617881815414166","s":"18498477091887383992694619839012590875352429373220077631585994996512199561895"}}},"credential":{"owner":{"_type":"PublicKey","value":"B62qrVPwPbeogxQKzPcV5dTSTmNo39g1T2hAM19cJ5Dtwk1p4STmKAE"},"data":{"nationality":"United States of America","name":"John Doe","birthDate":{"_type":"UInt64","value":"633830400000"},"id":{"_type":"Bytes","size":16,"value":"f6c75189e8326f524171107814a952bb"},"expiresAt":{"_type":"UInt64","value":"1848700800000"}}}}]}';

  const originalPayload =
    '{"verifierIdentity":"http://localhost:5173","presentationRequest":{"type":"https","spec":{"inputs":{"credential":{"type":"credential","credentialType":"simple","witness":{"type":{"_type":"Constant","value":"simple"},"issuer":{"_type":"PublicKey"},"issuerSignature":{"_type":"Signature"}},"data":{"_type":"DynamicRecord","_isFactory":true,"maxEntries":20,"knownShape":{"nationality":{"_type":"DynamicString","_isFactory":true,"maxLength":50},"expiresAt":{"_type":"UInt64"},"id":{"_type":"Bytes","size":16}}}},"acceptedNations":{"type":"claim","data":{"_type":"DynamicArray","_isFactory":true,"maxLength":100,"innerType":{"_type":"Field"}}},"acceptedIssuers":{"type":"claim","data":{"_type":"DynamicArray","_isFactory":true,"maxLength":100,"innerType":{"_type":"Field"}}},"currentDate":{"type":"claim","data":{"_type":"UInt64"}},"appId":{"type":"claim","data":{"_type":"DynamicString","_isFactory":true,"maxLength":50}}},"logic":{"assert":{"type":"and","inputs":[{"type":"equalsOneOf","input":{"type":"hash","inputs":[{"type":"property","key":"nationality","inner":{"type":"property","key":"data","inner":{"type":"property","key":"credential","inner":{"type":"root"}}}}],"prefix":null},"options":{"type":"property","key":"acceptedNations","inner":{"type":"root"}}},{"type":"equalsOneOf","input":{"type":"issuer","credentialKey":"credential"},"options":{"type":"property","key":"acceptedIssuers","inner":{"type":"root"}}},{"type":"lessThanEq","left":{"type":"property","key":"currentDate","inner":{"type":"root"}},"right":{"type":"property","key":"expiresAt","inner":{"type":"property","key":"data","inner":{"type":"property","key":"credential","inner":{"type":"root"}}}}}]},"outputClaim":{"type":"record","data":{"nullifier":{"type":"hash","inputs":[{"type":"property","key":"data","inner":{"type":"property","key":"credential","inner":{"type":"root"}}},{"type":"property","key":"appId","inner":{"type":"root"}}],"prefix":null}}}}},"claims":{"acceptedNations":{"_type":"DynamicArray","_isFactory":true,"maxLength":100,"innerType":{"_type":"Field"},"value":[{"_type":"Field","value":"1535750191209038276491867256345743424918048468505871420482779334664484555622"},{"_type":"Field","value":"22047996538609280301110666364818369992447508174403408199422649676981322383447"},{"_type":"Field","value":"24056497251096418057564183210090983888753346776669738257197194846336719337693"}]},"acceptedIssuers":{"_type":"DynamicArray","_isFactory":true,"maxLength":100,"innerType":{"_type":"Field"},"value":[{"_type":"Field","value":"28347822926984724480446959115324514713327607601427703637718079886029017192813"},{"_type":"Field","value":"10545277205047798105170814103522416698753103492194757723293048794780163943985"},{"_type":"Field","value":"19121754718825212243173714495718296906304089995296311977853175119086725829147"}]},"currentDate":{"_type":"UInt64","value":"1734003118983"},"appId":{"_type":"DynamicString","_isFactory":true,"maxLength":50,"value":"my-app-id:123"}},"inputContext":{"type":"https","action":"my-app-id:123:authenticate","serverNonce":{"_type":"Field","value":"15018227851641866962993945960711741440368625349699120733521484353302914788852"}}},"selectedCredentials":[{"version":"v0","witness":{"type":"simple","issuer":{"_type":"PublicKey","value":"B62qjV5nfrZ99BrfkhPoWPS3r13qdAi2fjo7mj3JikcWVQA1ysgLDzy"},"issuerSignature":{"_type":"Signature","value":{"r":"20045818248959908062758704145550926090410526868499434677005494900242791812884","s":"21161039401611682835886738800915052238040683291852176419465684585602599259191"}}},"credential":{"owner":{"_type":"PublicKey","value":"B62qnQWFSstcDaRRWa2un7sRsLUgZijA1Erz78B29MDUGhdx6gLP1Ua"},"data":{"nationality":"United States of America","name":"John Doe","birthDate":{"_type":"UInt64","value":"633830400000"},"id":{"_type":"Bytes","size":16,"value":"56c36c3e59a0b66ab295727e6931e92f"},"expiresAt":{"_type":"UInt64","value":"1848700800000"}}}}]}';

  const parsedPayload = JSON.parse(
    originalPayload
  ) as PresentationRequestPayload;

  const { presentationRequest, selectedCredentials, verifierIdentity } =
    parsedPayload;

  const stringifiedPresentationRequest = JSON.stringify(presentationRequest);

  const storedCredentials = [];
  for (const credential of selectedCredentials) {
    const stored = await Credential.fromJSON(JSON.stringify(credential));
    storedCredentials.push(stored);
    console.log(JSON.stringify(stored));
  }

  const parsedPresentationRequest = JSON.parse(
    stringifiedPresentationRequest
  ) as PresentationRequest;

  const requestType = parsedPresentationRequest.type;

  const deserialized = PresentationRequest.fromJSON(
    requestType,
    stringifiedPresentationRequest
  );

  const compiled = await Presentation.compile(deserialized);

  const verifierIdentityString =
    requestType === "zk-app"
      ? JSON.stringify(verifierIdentity)
      : (verifierIdentity as string);

  const prepared = await Presentation.prepare({
    request: compiled,
    credentials: storedCredentials,
    context: { verifierIdentity: verifierIdentityString },
  });

  const signature =
    "7mX7RT6TGm9zpaq1qujsSTSVQvwQkRg47kJYNGYpPjysG5kZGxJ7NQLDscTS86ohkyPfnUcoH3gcJzyFwky3YeA3dGbZx6Qn";
  //7mWzmDPEpC4ECp2vND5hhUmv9oideuVyhcUcAYWTWpDGc1NnfdmTprbJcgrduW7yD4K3stVJsgDmQFb1ajkbuRZe29zkvZT6

  const ownerSignature = Signature.fromBase58(signature);

  prepared.clientNonce = Field(
    "3201311139927595219719254187460322229151738099104905704651075330973893055408"
  );
  //14894302033633010544344630637513263125862384994554252739419068150261946328234
  prepared.context = Field(
    "6210077346019077037372064129978306290701080414167837468073194432358968038515"
  );
  //24256991605709301862588426927926493100670710575226054144501914198795860093922

  const presentation = await Presentation.finalize(
    compiled,
    ownerSignature,
    prepared
  );

  console.log(JSON.stringify(presentation));
}

run();
