import * as AuthenticationService from './authentication.service';

export const signUp = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const user = await AuthenticationService.signUp({ firstname, lastname, email, password });
    const accessToken = await AuthenticationService.generateAccessToken(user.id);

    return res.status(201).json({ user, accessToken });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ error });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthenticationService.signIn({ email, password });
    const accessToken = await AuthenticationService.generateAccessToken(user.id);

    return res.status(200).json({ user, accessToken });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ error });
  }
};
