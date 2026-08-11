import SiteSetting from '../models/SiteSetting.js';

const mapSetting = (s) => {
  if (!s) return null;
  const plain = s.toJSON ? s.toJSON() : s;
  return { ...plain, _id: plain.id };
};

export const getSettings = async (req, res) => {
  try {
    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = await SiteSetting.create({});
    }
    return res.json(mapSetting(settings));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = await SiteSetting.create(req.body);
    } else {
      await settings.update(req.body);
    }
    return res.json(mapSetting(settings));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
