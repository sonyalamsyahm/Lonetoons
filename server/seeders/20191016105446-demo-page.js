"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "pages",
      [
        {
          page: 1,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQc4ShF0Heoa4zcK5XC_gueZ3G3ttO7vnvWwEITNcPVIBoKxluf",
          id_episode: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 2,
          image:
            "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-15/e35/36147949_222893861681309_544540031373541376_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_cat=105&se=7&oh=7812441549ceb18fb0d60b43bc3adfee&oe=5E249DE8&ig_cache_key=MTgxNzQzMjE5MjY2MzcxNDMzNw%3D%3D.2",
          id_episode: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 3,
          image:
            "https://cdn.idntimes.com/content-images/community/2018/09/af51e0b3ccfd39100b64a663cdc7c041_600x400.jpg",
          id_episode: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 4,
          image: "https://pbs.twimg.com/media/DRUvKKGUEAAApev.jpg",
          id_episode: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 1,
          image: "https://pbs.twimg.com/media/DeR2tU_V4AA3PUU.jpg",
          id_episode: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 2,
          image:
            "https://pics.me.me/reverse-psychology-a-was-lllll-awas-jangan-tengok-jangan-60-15419078.png",
          id_episode: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 1,
          image: "https://pbs.twimg.com/media/DQcF5iBUMAE9Hqb.jpg",
          id_episode: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 2,
          image: "https://pbs.twimg.com/media/DbYeYVnUwAA6SAM.jpg",
          id_episode: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 3,
          image:
            "https://pics.me.me/sore-pak-rian-kaya-mau-minta-tolong-sama-bapak-ini-22850006.png",
          id_episode: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 1,
          image:
            "https://pics.me.me/baik-nak-ayah-akan-mengajarkan-tahap-hiat-iii-dasar-bela-16406222.png",
          id_episode: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 2,
          image:
            "https://pics.me.me/maaf-nak-ibu-harus-melakukan-ini-mind-blowon-o-2017-11698719.png",
          id_episode: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 1,
          image:
            "https://scontent-sjc3-1.cdninstagram.com/vp/b8f4d350ffba3be2b5d50eb29b781601/5DDD56DB/t51.2885-15/e35/51562249_2147223522005842_8471939828131293804_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com",
          id_episode: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 2,
          image:
            "https://pics.ballmemes.com/pssstt-apa-mind-blowon-o-2017-tahilalats-com-kunci-jawaban-18902503.png",
          id_episode: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 1,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKHUpRetL7vVAhBoshFYHMxPTDvNs5YS6vBCk72PckoS8NSeto",
          id_episode: 6,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 2,
          image:
            "https://pics.me.me/want-to-go-to-an-amusement-park-with-me-what-3872455.png",
          id_episode: 6,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 1,
          image:
            "https://vignette.wikia.nocookie.net/girlsofthewilds/images/6/6a/Ingui.jpg/revision/latest?cb=20160919001120",
          id_episode: 7,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 2,
          image:
            "https://vignette.wikia.nocookie.net/girlsofthewilds/images/e/e4/Image.jpeg/revision/latest/scale-to-width-down/185?cb=20160103150045",
          id_episode: 7,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 1,
          image: "https://pbs.twimg.com/media/CWFxpmjWwAAK4zv.jpg:large",
          id_episode: 8,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 2,
          image:
            "https://scontent.cdninstagram.com/vp/1e636c486a3bf2ffd897f77cf287d5b6/5DE64477/t51.2885-15/e35/s480x480/12145082_689700331167332_965469197_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com",
          id_episode: 8,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 1,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQXPl5GWaEh-BN9mqY_AVP0fpUEC_XR6uFQHXRt-g7c9_kmTnmj",
          id_episode: 9,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 2,
          image:
            "https://obs.line-scdn.net/0m0e2b131d1b6d0130606e75107b2037276d6f64682f417f47137b3d397b273b616a333c3c73303c5d3e2866303a/w644",
          id_episode: 9,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 1,
          image:
            "https://obs.line-scdn.net/0m0e2bcd5a1b6d0130606e75107b2d60236a6f643e2e4b214a137b3d397e2b3b626a333c3c73303c5d3e7d34653d/w644",
          id_episode: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 2,
          image:
            "https://obs.line-scdn.net/0m0e2429101b6d0130606e751074233d273f6f64682040291c137b3d392f7b6c356962613573303c5d3926373068/w644",
          id_episode: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 1,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRHDaT35csKYNUW6NV0ZlvjPYxBGoxc7GoUl8r1TeNXU0fHRbGL",
          id_episode: 11,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 2,
          image:
            "http://1.bp.blogspot.com/-_TO44OniEuA/VpXsx5QIRJI/AAAAAAAACB4/YMXVJucIq08/s1600/DP%2BBBM%2BGambar%2BKomik%2BLucu%2BSi%2BJuki%2B%25287%2529.jpg",
          id_episode: 11,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 1,
          image: "https://pbs.twimg.com/media/Bl53QApCAAAik2d.png",
          id_episode: 12,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 2,
          image: "https://pbs.twimg.com/media/Cn4PWOgUMAEAEuV.jpg",
          id_episode: 12,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 1,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRA7CBS-Xo8Zrc-UWUnUjs6uhxceUAPeAvWPC3W_UiYG9kHAoOG",
          id_episode: 13,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 2,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRCcLQpm9JZTkeKIMmeNhxYKW1r1RZFNZqItm6PtF32fwt7mxQE",
          id_episode: 13,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 1,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvVGdmf8JXpdsWT5Wg0WhmD9F7j54dCkcqZ-WQgtUDFMKbqOZr",
          id_episode: 14,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 2,
          image:
            "https://obs.line-scdn.net/0hPxM1CQr2D1dwSCRBWxhwAEoeDDhDJBxUFH5eSSAmUWMIfkgCSy9GYlxAUmcOfUgJGS5ENVJMFGYNKB0EHnlG/w644",
          id_episode: 14,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 1,
          image:
            "https://obs.line-scdn.net/0m0e29c2961b6d0130606e7510792d36703d6f643b7314204f137b3d392a2839396a333c3d73303c5d3c7e3e616a/w644",
          id_episode: 15,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 2,
          image:
            "https://cdn-production-thumbor-vidio.akamaized.net/Csn77gQbPf4zSqANJIlDxPI-9x4=/640x360/filters:quality(90)/vidio-web-prod-media/uploads/702768/images/webtoon-20untouchable-20episode-201-20bahasa-20indonesia-20anime-20romance-fb5f-640x360-00010.jpg",
          id_episode: 15,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 1,
          image:
            "https://obs.line-scdn.net/0m0e294ff71b6d0130606e7510792562723d6f643c234a284d137b3d392c273d386a333c6673303c5d3c2c313a69/w644",
          id_episode: 16,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 2,
          image:
            "https://obs.line-scdn.net/0m0e294fe61b6d0130606e7510792562713d6f643d7645214c137b3d39217e3d626a333c3373303c5d3c2c31626a/w644",
          id_episode: 16,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("pages", null, {});
  }
};
