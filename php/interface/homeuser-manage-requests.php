<div class="full-height full-width">
<h1>Manage Job Request</h1>
    <?php
    $dbhandler = SebenzaServer::fetchDatabaseHandler();
    $command = "SELECT `RequestedUser`,`workTypeID`,`JobDescription`,`Address`,`DateInitialised`,`JobCommencementDate`,`Accepted` FROM `QUOTE_REQUEST` WHERE `UserID`=?";
    $id = SebenzaServer::fetchSessionHandler()->getSessionVariable("UserID");
    $dbhandler->runCommand($command,$id);
    $result = $dbhandler->getResults();
    if(count($result)){
        var_dump($result);

        for($j=0;$j<count($result);$j++){

        }

    }
    else{
        echo '<h4>You currently have no job being requested</h4>';
    }

    ?>
</div>
