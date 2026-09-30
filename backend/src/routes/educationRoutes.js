const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const EducationCourse = require('../models/EducationCourse');
const UserProgress = require('../models/UserProgress');
const AuditLog = require('../models/AuditLog');

const router = express.Router();

router.get('/courses', authMiddleware, async (req, res) => {
  try {
    const courses = await EducationCourse.findAll({
      where: { is_active: true },
    });
    res.json({ courses });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch courses', error: error.message });
  }
});

router.get('/courses/:id', authMiddleware, async (req, res) => {
  try {
    const course = await EducationCourse.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ course });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch course', error: error.message });
  }
});

router.post('/enroll', authMiddleware, async (req, res) => {
  try {
    const { course_id } = req.body;

    const course = await EducationCourse.findByPk(course_id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    let progress = await UserProgress.findOne({
      where: {
        user_id: req.user.id,
        course_id,
      },
    });

    if (!progress) {
      progress = await UserProgress.create({
        user_id: req.user.id,
        course_id,
        status: 'in_progress',
      });
    }

    await AuditLog.create({
      user_id: req.user.id,
      action: 'COURSE_ENROLLED',
      entity_type: 'Course',
      entity_id: course_id,
    });

    res.json({ message: 'Enrolled successfully', progress });
  } catch (error) {
    res.status(500).json({ message: 'Failed to enroll', error: error.message });
  }
});

router.get('/progress', authMiddleware, async (req, res) => {
  try {
    const progress = await UserProgress.findAll({
      where: { user_id: req.user.id },
    });
    res.json({ progress });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch progress', error: error.message });
  }
});

router.post('/update-progress/:progressId', authMiddleware, async (req, res) => {
  try {
    const { progress_percent, exam_score } = req.body;

    const progress = await UserProgress.findByPk(req.params.progressId);
    if (!progress) {
      return res.status(404).json({ message: 'Progress record not found' });
    }

    await progress.update({
      progress_percent: progress_percent || progress.progress_percent,
      exam_score: exam_score || progress.exam_score,
      status: progress_percent === 100 ? 'completed' : 'in_progress',
    });

    res.json({ message: 'Progress updated', progress });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update progress', error: error.message });
  }
});

module.exports = router;
