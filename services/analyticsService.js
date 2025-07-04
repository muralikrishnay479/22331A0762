const ShortURL = require('../models/ShortURL');

exports.getStats = async (req, res) => {
  const { shortcode } = req.params;
  const record = await ShortURL.findOne({ shortcode });

  if (!record) return res.status(404).json({ error: 'Shortcode not found' });

  res.json({
    original_url: record.originalUrl,
    created_at: record.createdAt,
    expiry: record.expiry,
    clicks: record.clicks.length,
    click_data: record.clicks.map(click => ({
      timestamp: click.timestamp,
      referrer: click.referrer,
      location: click.location
    }))
  });
};