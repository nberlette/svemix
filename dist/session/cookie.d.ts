/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/**
 * Additional serialization options
 */
export interface CookieSerializeOptions {
	/**
	 * Specifies the value for the {@link https://tools.ietf.org/html/rfc6265#section-5.2.3|Domain Set-Cookie attribute}. By default, no
	 * domain is set, and most clients will consider the cookie to apply to only
	 * the current domain.
	 */
	domain?: string;
	/**
	 * Specifies a function that will be used to encode a cookie's value. Since
	 * value of a cookie has a limited character set (and must be a simple
	 * string), this function can be used to encode a value into a string suited
	 * for a cookie's value.
	 *
	 * The default function is the global `encodeURIComponent`, which will
	 * encode a JavaScript string into UTF-8 byte sequences and then URL-encode
	 * any that fall outside of the cookie range.
	 */
	encode?(value: string): string;
	/**
	 * Specifies the `Date` object to be the value for the {@link https://tools.ietf.org/html/rfc6265#section-5.2.1|`Expires` `Set-Cookie` attribute}. By default,
	 * no expiration is set, and most clients will consider this a "non-persistent cookie" and will delete
	 * it on a condition like exiting a web browser application.
	 *
	 * *Note* the {@link https://tools.ietf.org/html/rfc6265#section-5.3|cookie storage model specification}
	 * states that if both `expires` and `maxAge` are set, then `maxAge` takes precedence, but it is
	 * possible not all clients by obey this, so if both are set, they should
	 * point to the same date and time.
	 */
	expires?: Date;
	/**
	 * Specifies the boolean value for the {@link https://tools.ietf.org/html/rfc6265#section-5.2.6|`HttpOnly` `Set-Cookie` attribute}.
	 * When truthy, the `HttpOnly` attribute is set, otherwise it is not. By
	 * default, the `HttpOnly` attribute is not set.
	 *
	 * *Note* be careful when setting this to true, as compliant clients will
	 * not allow client-side JavaScript to see the cookie in `document.cookie`.
	 */
	httpOnly?: boolean;
	/**
	 * Specifies the number (in seconds) to be the value for the `Max-Age`
	 * `Set-Cookie` attribute. The given number will be converted to an integer
	 * by rounding down. By default, no maximum age is set.
	 *
	 * *Note* the {@link https://tools.ietf.org/html/rfc6265#section-5.3|cookie storage model specification}
	 * states that if both `expires` and `maxAge` are set, then `maxAge` takes precedence, but it is
	 * possible not all clients by obey this, so if both are set, they should
	 * point to the same date and time.
	 */
	maxAge?: number;
	/**
	 * Specifies the value for the {@link https://tools.ietf.org/html/rfc6265#section-5.2.4|`Path` `Set-Cookie` attribute}.
	 * By default, the path is considered the "default path".
	 */
	path?: string;
	/**
	 * Specifies the boolean or string to be the value for the {@link https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7|`SameSite` `Set-Cookie` attribute}.
	 *
	 * - `true` will set the `SameSite` attribute to `Strict` for strict same
	 * site enforcement.
	 * - `false` will not set the `SameSite` attribute.
	 * - `'lax'` will set the `SameSite` attribute to Lax for lax same site
	 * enforcement.
	 * - `'strict'` will set the `SameSite` attribute to Strict for strict same
	 * site enforcement.
	 *  - `'none'` will set the SameSite attribute to None for an explicit
	 *  cross-site cookie.
	 *
	 * More information about the different enforcement levels can be found in {@link https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7|the specification}.
	 *
	 * *note* This is an attribute that has not yet been fully standardized, and may change in the future. This also means many clients may ignore this attribute until they understand it.
	 */
	sameSite?: true | false | 'lax' | 'strict' | 'none';
	/**
	 * Specifies the boolean value for the {@link https://tools.ietf.org/html/rfc6265#section-5.2.5|`Secure` `Set-Cookie` attribute}. When truthy, the
	 * `Secure` attribute is set, otherwise it is not. By default, the `Secure` attribute is not set.
	 *
	 * *Note* be careful when setting this to `true`, as compliant clients will
	 * not send the cookie back to the server in the future if the browser does
	 * not have an HTTPS connection.
	 */
	secure?: boolean;
}
/**
 * Additional parsing options
 */
export interface CookieParseOptions {
	/**
	 * Specifies a function that will be used to decode a cookie's value. Since
	 * the value of a cookie has a limited character set (and must be a simple
	 * string), this function can be used to decode a previously-encoded cookie
	 * value into a JavaScript string or other object.
	 *
	 * The default function is the global `decodeURIComponent`, which will decode
	 * any URL-encoded sequences into their byte representations.
	 *
	 * *Note* if an error is thrown from this function, the original, non-decoded
	 * cookie value will be returned as the cookie's value.
	 */
	decode?(value: string): string;
}
export declare function daysToMaxage(days: number): number;
/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */
export declare function parse(str: string, options: CookieParseOptions): Record<string, string>;
/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */
export declare function serialize(name: string, val: any, options: CookieSerializeOptions): string;
