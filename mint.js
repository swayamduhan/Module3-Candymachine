const { getOrCreateAssociatedTokenAccount, mintTo } = require("@solana/spl-token");
const { Keypair, Connection, clusterApiUrl, LAMPORTS_PER_SOL, PublicKey } = require("@solana/web3.js")
const bs58 = require("bs58");

async function main(){
    // connect
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // generate keypair
    const devWallet = Keypair.fromSecretKey(new Uint8Array([
        229, 146, 134, 156,  66,  62,  15, 214, 221, 244,
         46,  76, 155, 240, 248,  83,  48, 173,  43, 106,
        166, 102, 103, 229,  62, 127, 240, 236, 212, 128,
        220, 170, 226, 203,  82, 233, 242,  46, 127,  73,
          5, 180, 112,  72, 120, 144, 150, 141, 230,  32,
        147, 245, 185, 151, 219, 255,  80, 142, 229, 168,
         17, 109,  46, 195
      ]))

    // create mint
    const mint = new PublicKey("GU565Zsef2HFL1DspTt7EyQcuBFtZgdfLHLcRD3ukFMw")
    const devTokenAccount = await getOrCreateAssociatedTokenAccount(connection, devWallet, mint, devWallet.publicKey)
    // const dev2TokenAccount = await getOrCreateAssociatedTokenAccount(connection, devWallet2, mint, devWallet2.publicKey)

    // mint
    const sig = await mintTo(connection, devWallet, mint, devTokenAccount.address, devWallet.publicKey, 1000)
    console.log(`mint tx  :  ${sig}`)
}

main()
.then(()=>{
    process.exit(0)
})
.catch((err)=>{
    console.log(err)
    process.exit(1)
})