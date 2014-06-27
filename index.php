<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="./js/lunacy.min.js"></script>

<link rel="stylesheet" media="all" href="./css/lunacy.min.css" />

<body>

	<div class="test-container">
		<?php for ($i = 1; $i < 199; $i++) { ?>
		<div class="test-box"><p>Box #<?php print $i; ?></p></div>
		<?php } ?>
	</div>

<script>$(".test-container").lunacy();</script>

</body>