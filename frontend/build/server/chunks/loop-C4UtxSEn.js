import { w as writeAndUnwriteText } from './writeAndUnwriteText-DtL0ElH-.js';
import { a as animationSetup, m as makeNestedStaticElementsVisible } from './animationSetup-OGJql9fW.js';
import './writeEffect-CapwHjJV.js';
import './unwriteEffect-Bk4DpCBY.js';
import './index-server-D2ILrLnm.js';
import './index2-9icAqEyj.js';

const loop = async (node, props) => {
  const { options, elements } = animationSetup(node, props);
  while (true) {
    makeNestedStaticElementsVisible(node);
    for (const element of elements) await writeAndUnwriteText(element, options);
  }
  return {
    update() {
    },
    destroy() {
    }
  };
};

export { loop as default };
//# sourceMappingURL=loop-C4UtxSEn.js.map
