
import { AppError } from '../../utils/index.js';
function referralController(referralServices) {
  async function referralConcepts(req, res) {
    try {
      // console.log(req.body);

      await referralServices.insertReferral(req.body);
      res.status(201).json({ msg: "Received referral" });
    } catch (err) {
      console.error(err); // Log the error for debugging
      throw new AppError(500, "fail", "Internal Server Error"); // Set a generic error message
    }
  }


  return {
    referralConcepts
  };
}

export default referralController;
