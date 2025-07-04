const ShortURL = require('../models/ShortURL'); // Relative path from controllers/
const nanoid = require('../utils/generateCode');
const { BASE_URL } = process.env;

exports.createShortURL = async (req, res) => {
  const { url, validity, shortcode } = req.body;
  const expiry = new Date(Date.now() + ((validity || 30) * 60000));
  const code = shortcode || nanoid();

  if (!/^https?:\/\/.+/.test(url)) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  const exists = await ShortURL.findOne({ shortcode: code }); // Line 14
  if (exists) return res.status(409).json({ error: 'Shortcode already exists' });

  const short = new ShortURL({ originalUrl: url, shortcode: code, expiry });
  await short.save();

  res.status(201).json({
    shortLink: `${BASE_URL}/${code}`,
    expiry: expiry.toISOString(),
  });
};