import { Router } from 'express';
import { check } from 'express-validator';
import { deleteMember, getAll, postMember, putMember } from '../controllers/members.js';
// import validarCampos from '../middlewares/validar-campos.js'
import { existCandidateEmail } from '../helpers/db-validators.js';

const router = Router();

router.get('/getAll', getAll);

router.put(
  '/',
  [
    check('email', 'not valid email format').isEmail(),
    check('name', 'name field is mandatory').not().isEmpty(),
    check('email').custom(existCandidateEmail),
  ],
  putMember
);

router.post(
  '/',
  [
    check('email', 'not valid email format').isEmail(),
    check('name', 'name field is mandatory').not().isEmpty(),
    check('email').custom(existCandidateEmail),
  ],
  postMember
);

router.delete('/', deleteMember);

export default router;
