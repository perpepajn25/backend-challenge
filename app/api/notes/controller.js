const noteService = require('app/modules/notes')

/**
 * @method listByUser
 */
exports.listByUser = async (req, res) => {
  const notes = await noteService.find({ user: req.params.id })
  res.status(200).send(notes)
}
