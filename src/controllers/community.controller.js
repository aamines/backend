const express = require("express");

const { PrismaClient } = require("@prisma/client");

//services
const { createCommunity } = require("../services/community.service");
const { createAdminAccount } = require("../services/account.service");

const prisma = new PrismaClient();

// Create a new community
exports.createCommunityController = async (req, res) => {
  const data = {
    name: req.body.name,
    type: req.body.type,
    vision: req.body.vision,
  };

  try {
    await createCommunity(data)
      .then(async (community) => {
        await createAdminAccount({ user: req.user, community: community })
          .then((account) => {
            return res.status(200).json({
              message: "Community created",
              data: account,
            });
          })
          .catch((error) => {
            return res.status(500).json({
              message: error,
            });
          });
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getCommunityById = async (req, res) => {
  const data = {
    id: req.params.commmunity,
  };

  try {
    const community = await prisma.community.findFirst({
      where: { communityId: data.id },
      include: {
        accounts: {
          include: {
            media_profile: true,
            role: true,
          },
        },
        groups: true,
      },
    });
    if (community) {
      res.status(200).json(community);
    } else {
      res.status(500).json({
        message: "can't find community with this id",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
