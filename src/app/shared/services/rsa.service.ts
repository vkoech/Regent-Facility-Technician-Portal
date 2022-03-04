import { Injectable } from '@angular/core';
import * as forge from 'node-forge'

@Injectable({
  providedIn: 'root'
})
export class RsaService {

  publicKey: string =`-----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCfm2uMTvb+gqXRFxWHnfCKcHfH
  v7aMN6oiEqTJj0BixtTYBXH89N+xuYgoIBnfMXPXPIg/UNWEOZtAETsOVvya+YBo
  ZZTquYJ2I0PaxtpUKkpCiEQ/bTCQIDAeUwHr0l4vUn/fmslD0rZ3+jo4Dsl8nX0O
  pwZQ2grQaXLb347RQwIDAQAB
  -----END PUBLIC KEY-----`;

  constructor() { }

  encryptWithPublicKey(valueToEncrypt: string): string {
    const rsa = forge.pki.publicKeyFromPem(this.publicKey);
    return window.btoa(rsa.encrypt(valueToEncrypt.toString()));
  }
}
