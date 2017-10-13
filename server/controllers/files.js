const db = require('../models');

exports.fetchFiles = (req, res) => {
  console.log('fetchFiles', req.decoded._id);

  db.File.findAll({
    where: {
      user_id: req.decoded._id,
    }
  }).then ( files => {
    console.log('after fetchFiles files=', files);

    res.json(files);
  })
};

exports.fetchRootFiles = (req, res) => {
  console.log('fetchRootFiles', req.decoded._id);

  db.File.findAll({
    where: {
      user_id: req.decoded._id,
      path: process.env.ROOT_FOLDER + req.decoded.email,
    }
  }).then((files) => {
    console.log('after fetchRootFiles files=', files);

    res.json(files);
  });
};

exports.fetchRootFilesWithShare = (req, res) => {
  console.log('fetchRootFilesWithShare', req.decoded._id);

  db.File.findAll({
    where: {
      user_id: req.decoded._id,
      path: process.env.ROOT_FOLDER + req.decoded.email,
    },
    include: [{ model: db.User }],
  }).then((files) => {
    // console.log('after fetchRootFilesWithShare files=', files);

    res.json(files);
  });
};

exports.starFile = (req, res) => {
  console.log('starFile', req.decoded._id);
  const file = req.body;
  console.log(`typeof file.is_starred=${typeof file.is_starred}`);
 
  const star_status = (file.is_starred == 'true');
  console.log(`starFile is_starred=${file.is_starred}, star_status = ${star_status}, typeof ${typeof star_status}`);

  db.File.update({ 
    is_starred: !file.is_starred,
  }, {
    where: { id: file.id },
  })
    .then(updatedFile => {
      console.log('after starFile updatedFile=', updatedFile);
      if(updatedFile[0] === 1)
      {
        console.log("file is starred successfully");
        res.json(true);
      } else {
        res.json(false);
      }
    }).catch(err => {
      console.log(err);
    })
};

exports.addFileSharing = (req, res) => {
  console.log('addFileSharing', req.decoded._id);
  console.log('req.body=', req.body);

  let users = req.body.users.split(/[,]\s/);
  console.log('users=', users);
  let file_id = req.body.file_id;

  db.User.findAll({
    where: {
      email: users,
    },
  }).then((fetchedUsers) => {
    console.log('fetchUsers', fetchedUsers);


    let bulkContent = fetchedUsers.map((i) => {
      return { user_id: i.id, file_id: file_id };
    });

    console.log('bulkContent', bulkContent);
    db.FileSharing.bulkCreate(bulkContent)
      .then(() => {

        // db.FileSharing.findAll({
        //   where: {
        //     file_id: file_id,
        //   }
        // }).then((finalResult) => {
        //   console.log('finalResult', finalResult);
        //   res.json(finalResult);
        // });

        // db.File.getUsers({
        //   where: {
        //     id: file_id,
        //   },
        // }).then((shareInfo) => {
        //   console.log('shareInfo', shareInfo);
        //   res.json(shareInfo);
        // });

        db.File.findAll({
          where: { id: file_id },
          include: [{ model: db.User }],
        }).then((shareInfo) => {
          console.log('shareInfo', shareInfo);
          res.json(shareInfo);
        });

      });
  });

  // res.json('addFileSharing');
}
