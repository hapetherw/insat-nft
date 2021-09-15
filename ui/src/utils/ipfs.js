import Helpers from './helper';
import buffer from 'buffer';
import IpfsHttpClient from 'ipfs-http-client';
/** 
 * IPFS Constants
 * @constant {string} IPFS_HOST The IPFS host url
 * @constant {number} IPFS_PORT The IPFS port
 * @constant {string} IPFS_PROTOCOL The IPFS comunication protocol
 */
    const IPFS_HOST     = 'ipfs.infura.io'
    const IPFS_PORT     = 5001
    const IPFS_PROTOCOL = 'https'

export default class IPFSService {

    static ipfsAPI = IpfsHttpClient({ host: IPFS_HOST, port: IPFS_PORT, protocol: IPFS_PROTOCOL });

    /**   
     * @name IPFSService.catJSON
     * @description Returns a file addressed by a valid IPFS Path.
     * 
     * @param {string} ipfsPath - An IPFS path or CID to export
     * 
     * @returns {Promise<Object>} The JSON object addressed at the ipfsPath.
     */
    catJSON(ipfsPath) {
        return (
            Helpers
                .createAsyncOperation(async (resolve, reject) => {
                    console.log('here1');
                
                    try {
                        IPFSService
                        .ipfsAPI
                        .cat(ipfsPath, (err, uint8Array) => {
                            console.log('here');
                            if (err) {
                                console.log('ipfs error', err);
                                reject(new Error(err));
                            }

                            const fileBuffer = buffer.Buffer.from(uint8Array);
                            const json       = JSON.parse(fileBuffer.toString('utf8'));
                            
                            resolve(json);
                        });
                    } catch(err) {
                        console.log(err);
                    }
                })
        )
    }

    /**   
     * @name IPFSService.add
     * @description Imports a file or data into IPFS.
     * 
     * @param {Object} data - The data object to import.
     * 
     * @summary
     *      The object passed to the IPFS.add can be a FileContent or FileObject. We are using the FileObject,
     *      as input, containing only the property 'content'
     * 
     *      @type {FileObject} - FileObject is a plain JS object of the following form:
     * 
     *      {
     *           // The path you want to the file to be accessible at from the root CID _after_ it has been added
     *           path?: string
     *           // The contents of the file (see below for definition)
     *           content?: FileContent
     *           // File mode to store the entry with (see https://en.wikipedia.org/wiki/File_system_permissions#Numeric_notation)
     *           mode?: number | string
     *           // The modification time of the entry (see below for definition)
     *           mtime?: UnixTime
     *      }
     * 
     *      @type {FileContent} - FileContent  is one of the following types:
     * 
     *      Uint8Array | Blob | String | Iterable<Uint8Array> | Iterable<number> | AsyncIterable<Uint8Array> | ReadableStream<Uint8Array>
     * 
     *      @see {@link https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfsadddata-options } - IPFS Docs
     * 
     * @returns {Promise<string>} The hash to the imported object
     */
    add(data) {
        return new Promise(async (resolve, reject) => {
          /** FileObject */
          const files = [{
              content:   buffer.Buffer(data)
          }];

          try {
            const result = await IPFSService.ipfsAPI.add(files);
            console.log(result);
            resolve(result.path);
          } catch(err) {
            reject(new Error(err));
          }
        })
    }

    /**   
     * @name IPFSService.hexToString
     * @description Parses an hexadecimal hash into an ipfs file hash string
     * 
     * @param {string} hash - The hexadecimal hash
     * 
     * @returns {string} The hash to the imported object
     */
    static hexToString(hash, web3) {
        return web3.utils.hexToUtf8(hash).replace('ipfs://','');
    }
}