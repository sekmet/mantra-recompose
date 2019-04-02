import {expect} from 'chai';
import {createApp} from '../';
import * as indexExports from '../';
import * as reactMantraDiExports from 'react-mantra-di';
import * as reComposerExports from 'recompose';
const {describe, it} = global;

describe('Module', () => {
  describe('createApp', async () => {
    it('should create app with provided args', () => {
      const context = {aa: 10};
      const app = createApp(context);
      expect(app.context).to.deep.equal(context);
    });
  });

  it('should have useDeps from react-mantra-di', () => {
    expect(indexExports.useDeps).to.be.equal(reactMantraDiExports.useDeps);
  });

  it('should have "compose" function from recompose', () => {
    const fnNames = [
      'compose'
    ];

    fnNames.forEach(fnName => {
      const reactKomposerFn = reComposerExports[fnName];
      const indexFN = indexExports[fnName];
      expect(reactKomposerFn).to.be.equal(indexFN);
    });
  });
});
