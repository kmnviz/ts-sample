import { Router } from 'express';
const router = Router();

router.get('/:ipAddress', async (req, res) => {
    const ipAddress = req.params.ipAddress;

    try {
        const result = await req.controller.lookupIp(ipAddress);
        return res.status(200).json({
            data: result,
            message: `IP was fetched.`
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});

router.delete('/:ipAddress', async (req, res) => {
    const ipAddress = req.params.ipAddress;

    try {
        const result = await req.controller.removeIpCache(ipAddress);
        return res.status(400).json({
            data: result,
            message: `IP was deleted.`
        });
    } catch (error) {
        return res.status(error.response.status).json({
            message: error.message
        });
    }
});

export default router;