const jwt = require('jsonwebtoken');

// التحقق من صلاحية التوكن
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'غير مصرح بالدخول' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'التوكن غير صالح' });
  }
};

// التحقق من صلاحيات المدير
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: 'ليس لديك صلاحية للوصول إلى هذا المورد' 
      });
    }
    next();
  };
};
