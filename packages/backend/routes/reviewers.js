import { Router } from 'express';
import { check } from 'express-validator';
import { deleteReviewer, getAll, getAllAsigns, getCandidates, postReviewer, putReviewer } from '../controllers/reviewers.js';
// import validarCampos from '../middlewares/validar-campos.js'
import { existCandidateEmail } from '../helpers/db-validators.js';

const router = Router();

router.get('/getAllAsigns', getAllAsigns);

router.get('/getAllAsigns/:id', getCandidates);

router.get('/getAll', getAll); // en lugar de all, getAll en todos | en los post agregar la palabra add/ | getTodayAssigns

router.put('/:id', putReviewer);

router.post(
  '/',
  [
    check('email', 'not valid email format').isEmail(),
    check('name', 'name field is mandatory').not().isEmpty(),
    check('email').custom(existCandidateEmail),
  ],
  postReviewer
);

router.delete('/', deleteReviewer);

export default router;
