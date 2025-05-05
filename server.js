require('app-module-path').addPath('./')

let app

exports.handler = async function (event, context) {
  if (!app) {
    // await the start method to ensure the db connection is established before first request
    app = await require('app').start()
  }

  return await app.server.run(event, context)
}
