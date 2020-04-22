var $content = $( '<div>' ).text( 'This is a test' );
var $closeButton = $( '<div>' )
    .text( 'CLOSE' )
    .css( {
        fontSize: '1.2em',
        float: 'right'
    } );
var $banner = $( "<div>")
    .append( $closeButton, $content )
    .css( {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '200px',
        backgroundColor: 'pink',
        color: 'white',
        padding: '1em',
        boxSizing: 'border-box'
    } );
$( 'body' ).append( $banner );
$closeButton.on( 'click', function() { $banner.hide(); } );
$banner.show();
