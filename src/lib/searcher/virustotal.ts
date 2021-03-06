import * as crypto from "crypto-js";
import * as url from "url";
import { buildURL } from "../url_builder";
import { Searcher, SearchableType } from "../types";

export class VirusTotal implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "url", "hash"];

  public constructor() {
    this.baseURL = "https://www.virustotal.com";
    this.name = "VirusTotal";
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, `/gui/ip-address/${query}/details`);
  }

  public searchByURL(query: string): string {
    const hash = crypto.SHA256(this.normalizeURL(query));
    return buildURL(this.baseURL, `/gui/url/${hash}/details`);
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, `/gui/domain/${query}/details`);
  }

  public searchByHash(query: string): string {
    return buildURL(this.baseURL, `/gui/file/${query}/details`);
  }

  private normalizeURL(uri: string): string {
    const parsedUrl = url.parse(uri);
    if (parsedUrl.pathname === "/" && !uri.endsWith("/")) {
      return `${uri}/`;
    }
    return uri;
  }
}
