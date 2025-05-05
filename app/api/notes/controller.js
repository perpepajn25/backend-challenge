const noteService = require('app/modules/notes')

/**
 * @method listByUser
 */
exports.listByUser = async (req, res) => {
  const notes = await noteService.find({ user: req.params.id })
  res.status(200).send(notes)
}

/**
 * @method create
 */
exports.create = async (req, res) => {
  const note = await noteService.create({ ...req.body, user: req.userId })
  res.status(201).send(note)
}
