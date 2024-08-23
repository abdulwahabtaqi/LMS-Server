<?php

// Connect to the database
$conn = pg_connect("host=localhost port=5432 dbname=lms user=postgres password=123456");

// Check connection
if (!$conn) {
  echo "Error: Unable to connect to the database: " . pg_last_error();
  exit;
}

// ---------------------------- School Data -----------------------
if (isset($_GET['get_school_data'])) {
  $query = 'SELECT * FROM public."School"';
  $result = pg_query($conn, $query);

  if (!$result) {
    echo "Error in query execution: " . pg_last_error($conn);
    pg_close($conn);
    exit;
  }

  $data = array();
  while ($row = pg_fetch_assoc($result)) {
    $data[] = $row;
  }

  header('Content-Type: application/json');
  print_r(json_encode($data));
}


// ---------------------------- Grade Data -----------------------
if (isset($_GET['get_grade_data'])) {
  $query = 'SELECT * FROM public."Grade"';
  $result = pg_query($conn, $query);

  if (!$result) {
    echo "Error in query execution: " . pg_last_error($conn);
    pg_close($conn);
    exit;
  }

  $data = array();
  while ($row = pg_fetch_assoc($result)) {
    $data[] = $row;
  }

  header('Content-Type: application/json');
  print_r(json_encode($data));
}


// ---------------------------- Subject Data -----------------------
if (isset($_GET['get_subject_data'])) {
  $query = 'SELECT * FROM public."Subject"';
  $result = pg_query($conn, $query);

  if (!$result) {
    echo "Error in query execution: " . pg_last_error($conn);
    pg_close($conn);
    exit;
  }

  $data = array();
  while ($row = pg_fetch_assoc($result)) {
    $data[] = $row;
  }

  header('Content-Type: application/json');
  print_r(json_encode($data));
}



// ---------------------------- Topic Data -----------------------

if (isset($_GET['get_topic_data'])) {
  $query = 'SELECT * FROM public."Topic"';
  $result = pg_query($conn, $query);

  if (!$result) {
    echo "Error in query execution: " . pg_last_error($conn);
    pg_close($conn);
    exit;
  }

  $data = array();
  while ($row = pg_fetch_assoc($result)) {
    $data[] = $row;
  }

  header('Content-Type: application/json');
  print_r(json_encode($data));
}



// ---------------------------- SubTopic Data -----------------------
if (isset($_GET['get_subtopic_data'])) {
  $query = 'SELECT * FROM public."SubTopic"';
  $result = pg_query($conn, $query);

  if (!$result) {
    echo "Error in query execution: " . pg_last_error($conn);
    pg_close($conn);
    exit;
  }

  $data = array();
  while ($row = pg_fetch_assoc($result)) {
    $data[] = $row;
  }

  header('Content-Type: application/json');
  print_r(json_encode($data));
}


// ---------------------------- Import Paper -----------------------

if (isset($_GET['import_paper'])) {
  $fileInputName = 'adil'; // Replace with the name of the input field
$fileName = imgUpload($fileInputName);
 $message = ['success' => true, 'message' => 'File uploaded successfully: ' . $fileName];
  header('Content-Type: application/json');
  echo json_encode($message);
}



if (isset($_GET['import_paperaa'])) {
return;

  $rawData = file_get_contents('php://input');
  $postData = json_decode($rawData, true);
  // $subTopicId = $postData['sub_topic_id'];


  $fileData = $postData['file'];
  $fileName = $postData['fileName'];
  $uniqueFileName = uniqid() . '_' . date('YmdHis') . '.' . pathinfo($fileName, PATHINFO_EXTENSION);
$uploadFolder = 'uploads/';
$filePath = $uploadFolder . $uniqueFileName;

// Save the file to the local folder
file_put_contents($filePath, base64_decode($fileData));

return;
  // -----------------------------------------------------
  // ------------------------- Short Question  ----------------
  // -----------------------------------------------------
  if ($postData['short_questions_check'] == 1) {
    $shortQuestionsIndexNumbers = [];
    foreach ($postData as $key => $value) {
      if (preg_match('/^short_question\[(\d+)\]$/', $key, $match)) {
        $shortQuestionsIndexNumbers[] = intval($match[1]);
      }
    }


    foreach ($shortQuestionsIndexNumbers as $shortQuestionsIndexNumber) {
      // $shortQuestionsIndexNumber = 1;
      $type = "SHORT";

      $questionId =  insertQuestion(
        $conn,
        $subTopicId,
        $question = $postData["short_question[$shortQuestionsIndexNumber]"],
        $type,
        $difficultyLevel = $postData["short_question_difficulty_level[$shortQuestionsIndexNumber]"],
        $marks = 1,
        $importId = uuid_create(),
        $answerCount = 0,
        $questionImage = '',
        $mcqImage = 'false',
        $additional = '',
      );


      insertAnswer(
        $conn,
        $questionId,
        $answer = $postData["short_question_answer[$shortQuestionsIndexNumber]"],
        $type,
        $isCorrect = 'true',
        $importId = uuid_create(),
        $answerImage = '',
        $sequenceNo = 0,
        $additional = ''
      );
    }


    echo "Short Questions are imported";
    // print_r($questionId);
  }


  // -----------------------------------------------------
  // ------------------------- Long Question Start  ------=
  // -----------------------------------------------------

  if ($postData['long_questions_check'] == 1) {
    $longQuestionsIndexNumbers = [];
    foreach ($postData as $key => $value) {
      if (preg_match('/^long_question\[(\d+)\]$/', $key, $match)) {
        $longQuestionsIndexNumbers[] = intval($match[1]);
      }
    }

    foreach ($longQuestionsIndexNumbers as $longQuestionsIndexNumber) {
      // $longQuestionsIndexNumber = 1;
      $type = "LONG";
      $questionId =  insertQuestion(
        $conn,
        $subTopicId,
        $question = $postData["long_question[$longQuestionsIndexNumber]"],
        $type,
        $difficultyLevel = $postData["long_question_difficulty_level[$longQuestionsIndexNumber]"],
        $marks = 1,
        $importId = uuid_create(),
        $answerCount = 0,
        $questionImage = '',
        $mcqImage = 'false',
        $additional = '',
      );
      insertAnswer(
        $conn,
        $questionId,
        $answer = $postData["long_question_answer[$longQuestionsIndexNumber]"],
        $type,
        $isCorrect = 'true',
        $importId = uuid_create(),
        $answerImage = '',
        $sequenceNo = 0,
        $additional = ''
      );
    }
    echo "Long Questions are imported";
  }

  // -----------------------------------------------------
  // ------------------------- Long Question End ------
  // -----------------------------------------------------

  // -----------------------------------------------------
  // ------------------------- SEQUENCE Question  ----------------
  // -----------------------------------------------------

  if ($postData['sequence_check'] == 1) {
    $sequenceQuestionsIndexNumbers = [];
    foreach ($postData as $key => $value) {
      if (preg_match('/^sequence_question\[(\d+)\]$/', $key, $match)) {
        $sequenceQuestionsIndexNumbers[] = intval($match[1]);
      }
    }

    foreach ($sequenceQuestionsIndexNumbers as $sequenceQuestionsIndexNumber) {
      // $sequenceQuestionsIndexNumber = 1;
      $type = "SEQUENCE";
      $questionId =  insertQuestion(
        $conn,
        $subTopicId,
        $question = $postData["sequence_question[$sequenceQuestionsIndexNumber]"],
        $type,
        $difficultyLevel = $postData["sequence_difficulty_level[$sequenceQuestionsIndexNumber]"],
        $marks = 1,
        $importId = uuid_create(),
        $answerCount = 0,
        $questionImage = '',
        $mcqImage = 'false',
        $additional = '',
      );

      $sequenceOptionsIndexes = [];
      foreach ($postData as $key => $value) {
        if (preg_match('/^sequence_option_(A|B|C|D|E|F|G|H|I|J|K|L|M)\[' . $sequenceQuestionsIndexNumber . '\]/', $key, $match)) {
          $sequenceOptionsIndexes[] = $match[1];
        }
      }

      foreach ($sequenceOptionsIndexes as $sequenceOptionsIndex) {

        insertAnswer(
          $conn,
          $questionId,
          $answer = $postData["sequence_option_{$sequenceOptionsIndex}[$sequenceQuestionsIndexNumber]"],
          $type,
          $isCorrect = 'true',
          $importId = uuid_create(),
          $answerImage = '',
          $sequenceNo = $postData["sequence_correct_{$sequenceOptionsIndex}_{$sequenceQuestionsIndexNumber}"],
          $additional = ''
        );
      }
    }
    echo "sequence Questions are imported";
  }


  // -----------------------------------------------------
  // ------------------------- Group short Question  ----------------
  // -----------------------------------------------------

  if ($postData['group_short_questions_check'] == 1) {
    $groupShortQuestionsIndexNumbers = [];
    foreach ($postData as $key => $value) {
      if (preg_match('/^group_short_question\[(\d+)\]$/', $key, $match)) {
        $groupShortQuestionsIndexNumbers[] = intval($match[1]);
      }
    }
    foreach ($groupShortQuestionsIndexNumbers as $groupShortQuestionsIndexNumber) {
      // $groupShortQuestionsIndexNumber = 1;
      $type = "MULTIPLSHORT";
      $questionId =  insertQuestion(
        $conn,
        $subTopicId,
        $question = $postData["group_short_question[$groupShortQuestionsIndexNumber]"],
        $type,
        $difficultyLevel = $postData["group_short_difficulty_level[$groupShortQuestionsIndexNumber]"],
        $marks = 1,
        $importId = uuid_create(),
        $answerCount = 0,
        $questionImage = '',
        $mcqImage = 'false',
        $additional = '',
      );

      $groupAnswersIndexes = [];
      foreach ($postData as $key => $value) {
        if (preg_match('/^group_short_' . $groupShortQuestionsIndexNumber . '_answer_(\d+)$/', $key, $match)) {
          $groupAnswersIndexes[] = $match[1];
        }
      }

      foreach ($groupAnswersIndexes as $groupAnswersIndex) {
        insertAnswer(
          $conn,
          $questionId,
          $answer = $postData["group_short_{$groupShortQuestionsIndexNumber}_answer_{$groupAnswersIndex}"],
          $type,
          $isCorrect = 'true',
          $importId = uuid_create(),
          $answerImage = '',
          $sequenceNo = 0,
          $additional = ''
        );
      }
    }
    echo "Group Short Questions are imported";
  }

  // -----------------------------------------------------
  // ------------------------- Fill in Blanks  ----------------
  // -----------------------------------------------------

  if ($postData['fill_in_th_blanks_check'] == 1) {


    $fillInBlanksIndexNumbers = [];
    foreach ($postData as $key => $value) {
      if (preg_match('/^fill_in_blanks_1\[(\d+)\]$/', $key, $match)) {
        $fillInBlanksIndexNumbers[] = intval($match[1]);
      }
    }



    foreach ($fillInBlanksIndexNumbers as $fillInBlanksIndexNumber) {

      // $fillInBlanksIndexNumber = 1;

      // ------------- Question -------------------
      $questionuuid = uuid_create();
      $question = $postData["fill_in_blanks_1[$fillInBlanksIndexNumber]"] . '_______' . $postData["fill_in_blanks_2[$fillInBlanksIndexNumber]"];
      $type = 'FILLINTHEBLANK';
      $difficultyLevel = $postData["fill_in_blanks_difficulty_level[$fillInBlanksIndexNumber]"];
      $marks = 1;
      $importId = uuid_create();
      $answerCount = 0;
      $questionImage = '';
      $mcqImage = false;
      $additional = '';


      // Construct your INSERT query with proper syntax
      $query = "INSERT INTO public.\"Question\" (
    \"id\", 
    \"subTopicId\", 
    \"question\", 
    \"type\", 
    \"difficultyLevel\", 
    \"marks\", 
    \"importId\", 
    \"answerCount\", 
    \"questionImage\", 
    \"mcqImage\", 
    \"additional\",
    \"updatedAt\"
    ) 
  VALUES (
  '$questionuuid',
    '$subTopicId', 
    '$question', 
    '$type', 
    '$difficultyLevel', 
    '$marks', 
    '$importId', 
    '$answerCount', 
    '$questionImage', 
    FALSE, 
    '$additional',
    '2024-07-01 15:10:15.29'
    )RETURNING \"id\"";
      $result = pg_query($conn, $query);
      $row = pg_fetch_assoc($result);
      $questionId = $row['id'];




      // --------- Answer ---------------


      $answerUuid = uuid_create();

      $answer = $postData["fill_in_blanks_answer[$fillInBlanksIndexNumber]"];
      $type = 'FILLINTHEBLANK';
      $isCorrect = true;
      $importId = 'dsfasdfas';
      $answerImage = '';
      $sequenceNo = 0;
      $additional = '';
      // Construct your INSERT query with proper syntax
      $query = "INSERT INTO public.\"Answer\" (
      \"id\", 
      \"questionId\", 
      \"answer\", 
      \"type\", 
      \"isCorrect\", 
      \"importId\", 
      \"answerImage\", 
      \"sequenceNo\", 
      \"additional\",
      \"updatedAt\"
      ) 
    VALUES (
      '$answerUuid',
      '$questionId', 
      '$answer', 
      '$type', 
      '$isCorrect', 
      '$importId', 
      '$answerImage', 
      '$sequenceNo', 
      '$additional',
      '2024-07-01 15:10:15.29'
      )";
      $result = pg_query($conn, $query);
    }



    echo "Fill In the Blanks imported";
  }


  // -----------------------------------------------------
  // ------------------------- Multiple Fill in Blanks  ----------------
  // -----------------------------------------------------

  if ($postData['multiple_fill_in_the_blanks_check'] == 1) {



    $multipleFillInBlanksIndexNumbers = [];
    foreach ($postData as $key => $value) {
      if (preg_match('/^multiple_fill_in_blanks1\[(\d+)\]$/', $key, $match)) {
        $multipleFillInBlanksIndexNumbers[] = intval($match[1]);
      }
    }



    foreach ($multipleFillInBlanksIndexNumbers as $multipleFillInBlanksIndexNumber) {

      // $multipleFillInBlanksIndexNumber = 1;

      // ------------- Question -------------------
      $questionuuid = uuid_create();
      $question = $postData["multiple_fill_in_blanks1[$multipleFillInBlanksIndexNumber]"] . '_______' . $postData["multiple_fill_in_blanks2[$multipleFillInBlanksIndexNumber]"] . '_______' . $postData["multiple_fill_in_blanks3[$multipleFillInBlanksIndexNumber]"];
      $type = 'MULTIFILLINTHEBLANK';
      $difficultyLevel = $postData["multiple_fill_in_blanks_difficulty_level[$multipleFillInBlanksIndexNumber]"];
      $marks = 1;
      $importId = uuid_create();
      $answerCount = 0;
      $questionImage = '';
      $mcqImage = false;
      $additional = '';


      // Construct your INSERT query with proper syntax
      $query = "INSERT INTO public.\"Question\" (
    \"id\", 
    \"subTopicId\", 
    \"question\", 
    \"type\", 
    \"difficultyLevel\", 
    \"marks\", 
    \"importId\", 
    \"answerCount\", 
    \"questionImage\", 
    \"mcqImage\", 
    \"additional\",
    \"updatedAt\"
    ) 
  VALUES (
  '$questionuuid',
    '$subTopicId', 
    '$question', 
    '$type', 
    '$difficultyLevel', 
    '$marks', 
    '$importId', 
    '$answerCount', 
    '$questionImage', 
    FALSE, 
    '$additional',
    '2024-07-01 15:10:15.29'
    )RETURNING \"id\"";
      $result = pg_query($conn, $query);
      $row = pg_fetch_assoc($result);
      $questionId = $row['id'];






      // --------- Answer ---------------

      for ($i = 1; $i < 3; $i++) {

        $answerUuid = uuid_create();

        $answer = $postData["multiple_fill_in_blanks_answer{$i}[$multipleFillInBlanksIndexNumber]"];
        $type = 'MULTIFILLINTHEBLANK';
        $isCorrect = true;
        $importId = 'dsfasdfas';
        $answerImage = '';
        $sequenceNo = 0;
        $additional = '';
        // Construct your INSERT query with proper syntax
        $query = "INSERT INTO public.\"Answer\" (
      \"id\", 
      \"questionId\", 
      \"answer\", 
      \"type\", 
      \"isCorrect\", 
      \"importId\", 
      \"answerImage\", 
      \"sequenceNo\", 
      \"additional\",
      \"updatedAt\"
      ) 
    VALUES (
      '$answerUuid',
      '$questionId', 
      '$answer', 
      '$type', 
      '$isCorrect', 
      '$importId', 
      '$answerImage', 
      '$sequenceNo', 
      '$additional',
      '2024-07-01 15:10:15.29'
      )";
        $result = pg_query($conn, $query);
      }
    }

  echo "Multiple Fill in the Blanks are Imported";

  }


  // -----------------------------------------------------
  // ------------------------- True/False ----------------
  // -----------------------------------------------------

  if ($postData['multiple_true_false_check'] == 1) {


    $trueFalseIndexNumbers = [];
    foreach ($postData as $key => $value) {
      if (preg_match('/^true_false_question\[(\d+)\]$/', $key, $match)) {
        $trueFalseIndexNumbers[] = intval($match[1]);
      }
    }



    foreach ($trueFalseIndexNumbers as $trueFalseIndexNumber) {

      // ------------- Question -------------------
      $questionuuid = uuid_create();
      $question = 'Tick the correct box';
      $type = 'MULTIPLETRUEFALSE';
      $difficultyLevel = $postData["true_false_difficulty_level[$trueFalseIndexNumber]"];
      $marks = 1;
      $importId = uuid_create();
      $answerCount = 0;
      $questionImage = '';
      $mcqImage = false;
      $additional = '';


      // Construct your INSERT query with proper syntax
      $query = "INSERT INTO public.\"Question\" (
    \"id\", 
    \"subTopicId\", 
    \"question\", 
    \"type\", 
    \"difficultyLevel\", 
    \"marks\", 
    \"importId\", 
    \"answerCount\", 
    \"questionImage\", 
    \"mcqImage\", 
    \"additional\",
    \"updatedAt\"
    ) 
  VALUES (
  '$questionuuid',
    '$subTopicId', 
    '$question', 
    '$type', 
    '$difficultyLevel', 
    '$marks', 
    '$importId', 
    '$answerCount', 
    '$questionImage', 
    FALSE, 
    '$additional',
    '2024-07-01 15:10:15.29'
    )RETURNING \"id\"";
      $result = pg_query($conn, $query);
      $row = pg_fetch_assoc($result);
      $questionId = $row['id'];




      // --------- Answer ---------------


      $answerUuid = uuid_create();

      $answer = $postData["true_false_question[$trueFalseIndexNumber]"];
      $type = 'MULTIPLETRUEFALSE';
      $isCorrect = $postData["true_false_answer[$trueFalseIndexNumber]"];
      $importId = 'dsfasdfas';
      $answerImage = '';
      $sequenceNo = 0;
      $additional = '';
      // Construct your INSERT query with proper syntax
      $query = "INSERT INTO public.\"Answer\" (
      \"id\", 
      \"questionId\", 
      \"answer\", 
      \"type\", 
      \"isCorrect\", 
      \"importId\", 
      \"answerImage\", 
      \"sequenceNo\", 
      \"additional\",
      \"updatedAt\"
      ) 
    VALUES (
      '$answerUuid',
      '$questionId', 
      '$answer', 
      '$type', 
      '$isCorrect', 
      '$importId', 
      '$answerImage', 
      '$sequenceNo', 
      '$additional',
      '2024-07-01 15:10:15.29'
      )";
      $result = pg_query($conn, $query);
    }


    echo "True/False are imported";
  }

  // -----------------------------------------------------
  // ------------------------- True/False End -----------------------
  // -----------------------------------------------------

  // -----------------------------------------------------
  // ------------------------- MCQ  start -----------------------
  // -----------------------------------------------------
  if ($postData['mcqs_check'] == 1) {
    $mcqsIndexNumbers = [];
    foreach ($postData as $key => $value) {
      if (preg_match('/^mcqs_question\[(\d+)\]$/', $key, $match)) {
        $mcqsIndexNumbers[] = intval($match[1]);
      }
    }

    foreach ($mcqsIndexNumbers as $mcqsIndexNumber) {


      $type = "MCQ";
      $questionId =  insertQuestion(
        $conn,
        $subTopicId,
        $question = $postData["mcqs_question[$mcqsIndexNumber]"],
        $type,
        $difficultyLevel = $postData["mcqs_difficulty_level[$mcqsIndexNumber]"],
        $marks = 1,
        $importId = uuid_create(),
        $answerCount = 0,
        $questionImage = '',
        $mcqImage = 'false',
        $additional = '',
      );


      $mcqsOptionsIndexes = [];
      foreach ($postData as $key => $value) {
        if (preg_match('/^mcqs_option_([a-z])\[1\]$/', $key, $match)) {
          $mcqsOptionsIndexes[$match[1]] = $value;
        }
      }

      $answer = $postData["mcqs_answer[" . $mcqsIndexNumber . "]"];

      foreach ($mcqsOptionsIndexes as $mcqsOptionsIndex => $optionValue) {
        if ($answer == $mcqsOptionsIndex) {
          $isCorrect = true;
        } else {
          $isCorrect = 'false'; // Changed 'false' to false for boolean consistency
        }
        insertAnswer(
          $conn,
          $questionId,
          $answer = $optionValue,
          $type,
          $isCorrect,
          $importId = uuid_create(),
          $answerImage = '',
          $sequenceNo = 0,
          $additional = ''
        );
      }
    }

    echo "MCQs are imported";
  }
  // -----------------------------------------------------
  // ------------------------- MCQ  End  -----------------------
  // -----------------------------------------------------
}


function insertQuestion(
  $conn,
  $subTopicId,
  $question,
  $type,
  $difficultyLevel,
  $marks,
  $importId,
  $answerCount,
  $questionImage,
  $mcqImage,
  $additional
) {
  $id = uuid_create();
  $updatedAt = '2024-07-01 15:10:15.29';
  $query = "INSERT INTO public.\"Question\" (
    \"id\", 
    \"subTopicId\", 
    \"question\", 
    \"type\", 
    \"difficultyLevel\", 
    \"marks\", 
    \"importId\", 
    \"answerCount\", 
    \"questionImage\", 
    \"mcqImage\", 
    \"additional\", 
    \"updatedAt\"
) VALUES (
    '$id', 
    '$subTopicId', 
    '$question', 
    '$type', 
    '$difficultyLevel', 
    '$marks', 
    '$importId', 
    '$answerCount', 
    '$questionImage', 
    '$mcqImage', 
    '$additional', 
    '$updatedAt'
) RETURNING \"id\"";
  $result = pg_query($conn, $query);
  $row = pg_fetch_assoc($result);
  return $row['id'];
}


function insertAnswer(
  $conn,
  $questionId,
  $answer,
  $type,
  $isCorrect,
  $importId,
  $answerImage,
  $sequenceNo,
  $additional
) {

  $id = uuid_create();
  $updatedAt = '2024-07-01 15:10:15.29';
  $query = "INSERT INTO public.\"Answer\" 
( 
\"id\", 
\"questionId\",
 \"answer\", 
 \"type\", 
 \"isCorrect\",
  \"importId\",
   \"answerImage\", 
   \"sequenceNo\", 
   \"additional\",
    \"updatedAt\" 
    ) VALUES (
 '$id', 
 '$questionId', 
 '$answer',
  '$type',
   '$isCorrect', 
   '$importId',
    '$answerImage', 
    '$sequenceNo', 
 '$additional', 
 '$updatedAt' 
 )";
  $result = pg_query($conn, $query);
}


function uuid_create()
{
  $uuid = hash('ripemd160', microtime(true) . rand());
  $uuid = substr($uuid, 0, 8) . '-' . substr($uuid, 8, 4) . '-' . substr($uuid, 12, 4) . '-' . substr($uuid, 16, 4) . '-' . substr($uuid, 20);
  return $uuid;
}
function imgUpload($fileInputName)
{
 
  if (isset($_FILES[$fileInputName])) {
    $file = $_FILES[$fileInputName];
$fileName = $file['name'];
$fileData = base64_encode(file_get_contents($file['tmp_name']));
$uniqueFileName = uniqid() . '_' . date('YmdHis') . '.' . pathinfo($fileName, PATHINFO_EXTENSION);
$uploadFolder = 'uploads/';
$filePath = $uploadFolder . $uniqueFileName;

// Save the file to the local folder
file_put_contents($filePath, base64_decode($fileData));
return $uniqueFileName;
}
 
  
}


pg_close($conn);
