import fs from 'fs';
import path from 'path';
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

    const fileUrl = `/uploads/${req.file.filename}`;
    const filename = req.file.filename;

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

    // Attempt to delete local file from uploads directory if exists
    if (media.filename) {
      const localFilePath = path.join(process.cwd(), 'uploads', media.filename);
      if (fs.existsSync(localFilePath)) {
        try {
          fs.unlinkSync(localFilePath);
        } catch (unlinkErr) {
          console.warn(`[Media Unlink Warning]: Failed to remove file from disk: ${unlinkErr.message}`);
        }
      }
    }

    await media.destroy();
    return res.json({ message: 'Media file deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
