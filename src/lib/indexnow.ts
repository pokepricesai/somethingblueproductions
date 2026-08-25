/**
 * IndexNow submission helper.
 *
 * Docs: https://www.indexnow.org/documentation
 * One submission is picked up by Bing, Yandex, Seznam, Naver and other
 * IndexNow-compatible engines — Google does not participate.
 */

export const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY ?? '1be543715e36e39ed23faf90f8f043b9';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://something-blue-productions.com';

// The public key file must be served at `${SITE_URL}/${INDEXNOW_KEY}.txt`
// and its body must contain exactly the key string.
export const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

const ENDPOINT = 'https://api.indexnow.org/IndexNow';

export type IndexNowResult = {
  ok: boolean;
  status: number;
  submitted: string[];
  error?: string;
};

function toAbsoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }
  return `${SITE_URL}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
}

/**
 * Submit one or more URLs to IndexNow. Accepts absolute URLs or site-relative
 * paths (e.g. "/journal/new-post"). Returns {ok:true} for 200 and 202 responses.
 *
 * Call sparingly — only after a page's content has meaningfully changed.
 */
export async function submitToIndexNow(
  urls: string | string[]
): Promise<IndexNowResult> {
  const list = (Array.isArray(urls) ? urls : [urls])
    .map(toAbsoluteUrl)
    .filter((u, i, a) => a.indexOf(u) === i);

  if (list.length === 0) {
    return { ok: false, status: 0, submitted: [], error: 'No URLs supplied' };
  }

  const host = new URL(SITE_URL).host;

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList: list,
      }),
    });

    return {
      ok: res.status === 200 || res.status === 202,
      status: res.status,
      submitted: list,
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      submitted: list,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
