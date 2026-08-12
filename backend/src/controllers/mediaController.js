import Media from '../models/Media.js';

const mapMedia = (m) => {
  if (!m) return null;
  const plain = m.toJSON ? m.toJSON() : m;
  return { ...plain, _id: plain.id };
};

export const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Support both Cloudinary secure HTTPS URLs and local disk relative paths
    let fileUrl = `/uploads/${req.file.filename}`;
    if (req.file.path && (req.file.path.startsWith('http://') || req.file.path.startsWith('https://'))) {
      fileUrl = req.file.path;
    } else if (req.file.secure_url) {
      fileUrl = req.file.secure_url;
    }

    const filename = req.file.filename || req.file.originalname || `file-${Date.now()}`;

    const media = await Media.create({
      filename: filename,
      originalName: req.file.originalname,
      url: fileUrl,
      mimetype: req.file.mimetype,
      size: req.file.size || 0,
    });

    return res.status(201).json(mapMedia(media));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMedia = async (req, res) => {
  try {
    const mediaFiles = await Media.findAll({
      order: [['createdAt', 'DESC']],
    });
    return res.json(mediaFiles.map(mapMedia));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findByPk(req.params.id);
    if (!media) {
      return res.status(404).json({ message: 'Media file not found' });
    }
    await media.destroy();
    return res.json({ message: 'Media file deleted' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
