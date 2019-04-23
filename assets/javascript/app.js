$(document).ready(function () {
    /**
     * Function
     */

    // Get player action when button is clicked
    function getAction() {
        var action = $(this).val();

        console.log(action);
    }


    /**
     * Events
     */

    $(document).on("click", "button", getAction);

});