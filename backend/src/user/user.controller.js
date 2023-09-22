import * as UserService from './user.service';
import bcrypt from 'bcrypt';

export const getUsers = async (req, res) => {
  try {
    const users = await UserService.getUsers();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updateData = req.body;
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 12);
    }

    const user = await UserService.updateUser(req.params.id, updateData);

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (req.currentUserId === Number(req.params.id)) {
      return res.status(403).json({ message: 'Unable to delete this user' });
    }
    await UserService.deleteUser(req.params.id);

    return res.status(200).json({ message: 'User has been deleted' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
