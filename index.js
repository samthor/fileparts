import path from 'path';

/**
 * Wraps a filesystem path and provides helpers to change its parts.
 */
export default class FileParts {
  #path;

  /**
   * @param {(string|!FileParts)=} raw
   */
  constructor(raw = '') {
    if (raw instanceof FileParts) {
      this.#path = raw.path;
    } else {
      this.#path = raw.toString('utf-8');
    }
  }

  toString() {
    return this.#path;
  }

  toJSON() {
    return this.#path;
  }

  /**
   * Normalizes the contained path, as per Node.
   */
  normalize() {
    this.#path = path.normalize(this.#path);
  }

  /**
   * @return {string} returns the whole path
   */
  get path() {
    return this.#path;
  }

  /**
   * @param {string} v sets the whole path
   */
  set path(v) {
    this.#path = v;
  }

  /**
   * @return {string} return the basename without extension
   */
  get name() {
    return path.basename(this.#path, this.extname);
  }

  /**
   * @param {string} v updates the basename ignoring extension
   */
  set name(v) {
    this.path = path.join(this.dirname, v + this.extname);
  }

  /**
   * @return {string} return the basename without extension
   */
  get stem() {
    return this.name;
  }

  /**
   * @param {string} v updates the basename ignoring extension
   */
  set stem(v) {
    this.name = v;
  }

  /**
   * @return {string} the directory, will be '.' if unknown/unset
   */
  get dirname() {
    return path.dirname(this.#path);
  }

  /**
   * @param {string} v sets the directory, is not normalized
   */
  set dirname(v) {
    this.path = path.join(v, this.basename);
  }

  /**
   * @return {string} the basename, may be empty for dir
   */
  get basename() {
    return path.basename(this.#path);
  }

  /**
   * @param {string} v the basename to set
   */
  set basename(v) {
    this.path = path.join(this.dirname, v);
  }

  /**
   * @return {string} the extension including the dot
   */
  get extname() {
    return path.extname(this.#path);
  }

  /**
   * @param {string} v the extension to set, must include dot (or will just append)
   */
  set extname(v) {
    const {dir, name} = path.parse(this.#path);
    this.path = path.join(dir, name + v);
  }
}
