<?php
	// See all errors and warnings
	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);

	$mysqli = mysqli_connect("localhost", "root", "", "imy220a2");

	// If email and/or pass POST values are set, set the variables to those values, otherwise make them false
	$email = isset($_POST["email"]) ? $_POST["email"] : null;
	$pass = isset($_POST["pass"]) ? $_POST["pass"] : null;

	$query = "SELECT * FROM tbusers WHERE email = '$email' AND password = '$pass'";

	$res = mysqli_query($mysqli, $query);

	$row = mysqli_fetch_array($res);

	$userid = $row["user_id"];

	$folderName = "gallery/";
	$articleDescription = isset($_POST["articleDescription"]) ? $_POST["articleDescription"]:false;
	$articleName = isset($_POST["articleName"]) ? $_POST["articleName"]:false;
	$articleDate = isset($_POST["articleDate"]) ? $_POST["articleDate"]:false;
	$articleAuthor = isset($_POST["articleAuthor"]) ? $_POST["articleAuthor"]:false;

	


		if(isset($_FILES["picToUpload"]))
		{
			$uploadFile = $_FILES["picToUpload"];
			
			// Get the number of pics being uploaded
			$numFiles = count($uploadFile["name"]);

			$uploadSuccess = false;

			for($i = 0; $i < $numFiles; $i++)
			{
				// Check if file meets the extension and size requirements

				if( ($uploadFile["type"][$i] == "image/jpeg" || $uploadFile["type"][$i] == "image/jpeg") && $uploadFile["size"][$i] < 2097152)
				{
					if($uploadFile["error"][$i] > 0)
					{
						echo "Error: " . $uploadFile["error"][$i] . "<br/>";
					
					}//end if

					else
					{
						$filePath = $_FILES['picToUpload']['tmp_name'];

						// Move the file into the 'gallery' directory
						move_uploaded_file($_FILES['picToUpload']['tmp_name'][0], 'gallery/'.$_FILES['picToUpload']['name'][0]);

						// Get the current user's ID
						// Adding the article data to the database
						// Creating a article entry in tbarticles	
								
				

						$sql = "INSERT INTO tbarticles(user_id, title, description, author, date) VALUES('$userid','$articleName','$articleDescription','$articleAuthor','$articleDate')";
						$mysqli->query($sql);
						// $res = mysqli_query($mysqli, $sql) == TRUE;
						
						
						// $articleQuery = "SELECT * FROM tbarticles WHERE user_id = '$userid' AND title = '$articleName' AND description = '$articleDescription' AND author = '$articleAuthor' AND date = '$articleDate'";
						$articleQuery = "SELECT * FROM tbarticles WHERE title = '$articleName' AND description = '$articleDescription'";
						$articleResult = $mysqli->query($articleQuery);
						

						$articleDetails = mysqli_fetch_array($articleResult);				
						$articleid = $articleDetails['article_id'];
						// Adding the image to tbgallery
						$uploadFileName = $uploadFile["name"][$i];

						$sql = "INSERT INTO tbgallery(article_id, image_name) VALUES('$articleid','$uploadFileName')";
						$mysqli->query($sql);

						$uploadSuccess = true;
					
					}//end else
				}
			}	
			if($uploadSuccess)
				echo 	'<div class="alert alert-primary mt-3" role="alert">
							Article created
						</div>';
			else
			{
				echo 	'<div class="alert alert-danger mt-3" role="alert">
							Could not create article
						</div>';
			
			}//end else

		}//end if		
	

?>

<!DOCTYPE html>
<html>
<head>
	<title>IMY 220 - Assignment 2</title>
	<meta charset="utf-8" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="style.css" />
	<meta charset="utf-8" />
	<meta name="author" content="Name Surname">
	<!-- Replace Name Surname with your name and surname -->
	
</head>
<body>
	<div class="container">
		<?php 
			$query = "SELECT * FROM tbusers WHERE email = '$email' AND password = '$pass' ";
			$res = $mysqli->query($query);
			if($row = mysqli_fetch_array($res))
			{
				echo 	"<table class='table table-bordered mt-3'>
							<tr>
								<td>Name</td>
								<td>" . $row['name'] . "</td>
							<tr>
							<tr>
								<td>Surname</td>
								<td>" . $row['surname'] . "</td>
							<tr>
							<tr>
								<td>Email Address</td>
								<td>" . $row['email'] . "</td>
							<tr>
							<tr>
								<td>Birthday</td>
								<td>" . $row['birthday'] . "</td>
							<tr>
						</table>";
						

				echo 	"<form action='' method='POST' enctype='multipart/form-data'>
							<div class='form-group'>
								
								<input type='hidden' class='form-control' name='email' value='" . $_POST["email"] . "' />
								<input type='hidden' class='form-control' name='pass' value='" . $_POST["pass"] . "' />
								<label for='articleName'>Article Name:</label><br>
								<input type='text' class='form-control' name='articleName' /><br>	
								<label for='articleAuthor'>Article Author:</label><br>							
								<input type='text' class='form-control' name='articleAuthor' /><br>								
								<label for='articleDescription'>Article Description:</label><br>
								<input type='text' class='form-control' name='articleDescription' /><br>

								<label for 'articleDate'>Article date:</label><br>
								<input type='date' class='form-control' name='articleDate' /><br>	

								<input type='file' class='form-control' name='picToUpload[]' id='picToUpload' multiple='multiple' /><br/>								

								<input type='submit' class='btn-standard' value='Upload article' name='submit' />
							</div>
					  	</form>";	

				// displaying articles of user
				// get user's id

				$userQuery = "SELECT * FROM tbusers WHERE email = '$email' AND password = '$pass'";
				$userResult = $mysqli->query($userQuery);

				$userDetails = mysqli_fetch_array($userResult);				
				$userid = $userDetails['user_id'];

				$resQuery = "SELECT * FROM tbarticles WHERE user_id = '$userid' ORDER BY date desc";
				$res = $mysqli->query($resQuery);

				if($res->num_rows != 0)
				{
					echo "<h1 class='mt-3'>Latest articles</h1>";
					echo "<div class = 'row articlesGallery'>";
					while($row = mysqli_fetch_array($res))
					{
						// get the image for the current quiz from tbgallery

						$articleid = $row['article_id'];

						$imageQuery = "SELECT * FROM tbgallery WHERE article_id = $articleid";
						$imageResult = $mysqli->query($imageQuery); 
						$imageDetails = mysqli_fetch_array($imageResult);
						$imageName = $imageDetails['image_name'];
									// <img src = 'gallery/$imageName' width = '200'>
						
						echo	
						"
						
						<div class='card col-4'>
						<form method = 'POST' action = ''>
						<input type='hidden' class='form-control' name='email' value='" . $_POST["email"] . "' />
						<input type='hidden' class='form-control' name='pass' value='" . $_POST["pass"] . "' />
						<input type='hidden' class='form-control' name='articleID' value='" . $articleid . "' />
						<h4 class='card-title'>".$row['date']."</h4>
							<img class='card-img-top' src='gallery/$imageName' alt='Card image cap'>
							<div class='card-body'>
								<h5 class='card-title'>".$row['title']."</h5>
								<p class='card-text'>- ". $row['author'] ."</p>
								<p class='card-text'>". $row['description'] ."</p>
								<input type='submit' class='btn btn-danger' value='Delete' name='deleteArticle' />
								
							</div>
							</form>
							</div>
						";


						//BONUS MARKS STUFF
						
					}//end while

					echo "</div>";		
					echo "</div>";	
					if(isset($_POST['deleteArticle']))
					{
						// echo "$articleid";
						$articleToDelete = $_POST["articleID"];
						echo "$articleToDelete";
						$imageDeleteQuery = "DELETE FROM tbgallery WHERE article_id = $articleToDelete";
						$articleDeleteQuery = "DELETE FROM tbarticles WHERE article_id = $articleToDelete";
		
						if (mysqli_query($mysqli, $articleDeleteQuery) && mysqli_query($mysqli, $imageDeleteQuery)) 
						{
							echo "Record deleted successfully";
						} 
						else 
						{
							echo "Error deleting record: " . mysqli_error($mysqli);
						}
					}			
				}



			}//end if

			else
			{
				echo 	'<div class="alert alert-danger mt-3" role="alert">
  							You are not registered on this site!
  						</div>';
			}//end else


		?>
	</div>
</body>
</html>