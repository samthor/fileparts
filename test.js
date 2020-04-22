import mocha from 'mocha';
import chai from 'chai';
import FileParts from './index.js';

const {suite, test} = mocha;
const {assert} = chai;

suite('FileParts', () => {
  test('empty', () => {
    const p = new FileParts();
    assert.equal(p.name, '');
    assert.equal(p.basename, '');
    assert.equal(p.extname, '');
    assert.equal(p.dirname, '.');
    assert.equal(p.stem, '');
  });

  test('name', () => {
    const p = new FileParts('foo');
    assert.equal(p.name, 'foo');
    assert.equal(p.basename, 'foo');

    p.extname = '.bar';
    assert.equal(p.name, 'foo');
    assert.equal(p.basename, 'foo.bar');

    p.extname = 'foo';
    assert.equal(p.name, 'foofoo');
    assert.equal(p.basename, 'foofoo');

    p.extname = '.foo.bar';
    assert.equal(p.name, 'foofoo.foo');
    assert.equal(p.basename, 'foofoo.foo.bar');
    assert.equal(p.extname, '.bar');

    assert.equal(p.stem, 'foofoo.foo', '.stem should be the same as .name');
  });

  test('normalize', () => {
    const p = new FileParts('/hello/../there')
    assert.equal(p.dirname, '/hello/..');

    p.normalize();
    assert.equal(p.path, '/there');
  });

  test('helpers', () => {
    const p = new FileParts('/hello/there')

    const j = JSON.stringify(p);
    assert.equal(j, '"/hello/there"');

    const s = String(p);
    assert.equal(s, '/hello/there');
  });

  test('dir', () => {
    const p = new FileParts('foo');

    p.dirname = '../hello';
    assert.equal(p.path, '../hello/foo');
    assert.equal(p.dirname, '../hello');

    p.dirname = '../zing/'
    assert.equal(p.path, '../zing/foo');
    assert.equal(p.dirname, '../zing');

    p.dirname = '';
    assert.equal(p.path, 'foo');
    assert.equal(p.dirname, '.');
    assert.equal(p.basename, 'foo');

    // This is how Node says it works.
    p.path = 'foo/bar/';
    assert.equal(p.dirname, 'foo');
    assert.equal(p.basename, 'bar');
  });

  test('clone', () => {
    const p = new FileParts('/test/path.zip');
    const p2 = new FileParts(p);

    p.dirname = 'foo';
    assert.equal(p2.dirname, '/test');
    assert.equal(p.dirname, 'foo');
  });
});

