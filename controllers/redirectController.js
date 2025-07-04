const ShortURL = require('../models/ShortURL');
const geoip = require('geoip-lite');

exports.redirect = async (req, res) => {
  const { shortcode } = req.params;
  const record = await ShortURL.findOne({ shortcode });

  if (!record) return res.status(404).json({ error: 'Shortcode not found' });
  if (record.expiry < new Date()) return res.status(410).json({ error: 'Link expired' });

  const geo = geoip.lookup(req.ip);
  record.clicks.push({
    timestamp: new Date(),
    referrer: req.get('Referrer') || '',
    location: geo?.country || 'Unknown',
  });
  await record.save();

  res.redirect(record.originalUrl);
};