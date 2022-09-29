import { Router } from "express";

const router = Router();

const getJson = router.get('/json', (req, res) => {

});

const getIcon = router.get('/icon', (req, res) => {

});

module.exports = {
    getIcon,
    getJson
}