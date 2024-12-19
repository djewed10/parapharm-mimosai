module.exports={
    client:process.env.Client,
    remote_client:process.env.Remote_Client,
    allowed:(process.env.NODE_ENV==="production"?
        [process.env.Remote_Client,process.env.Remote_Server]:
        [process.env.Client,process.env.Server]
    )
}