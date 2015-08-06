<?php
/**
 * Combine JS Script
 *
 * User: matthes
 * Date: 06.08.15
 * Time: 13:35
 */

header ("Content-Type: text/css");




/**
 * Compress JavaScript in $input
 *
 * @param $input
 * @return string
 */
function js_strip_whitespace ($input) {
    // JavaScript compressor by John Elliot <jj5@jj5.net>
    $replace = array(
        '#\'([^\n\']*?)/\*([^\n\']*)\'#' => "'\1/'+\'\'+'*\2'", // remove comments from ' strings
        '#\"([^\n\"]*?)/\*([^\n\"]*)\"#' => '"\1/"+\'\'+"*\2"', // remove comments from " strings
        '#/\*.*?\*/#s'            => "",      // strip C style comments
        '#[\r\n]+#'               => "\n",    // remove blank lines and \r's
        '#\n([ \t]*//.*?\n)*#s'   => "\n",    // strip line comments (whole line only)
        '#([^\\])//([^\'"\n]*)\n#s' => "\\1\n",
        // strip line comments
        // (that aren't possibly in strings or regex's)
        '#\n\s+#'                 => "\n",    // strip excess whitespace
        '#\s+\n#'                 => "\n",    // strip excess whitespace
        '#(//[^\n]*\n)#s'         => "\\1\n", // extra line feed after any comments left
        // (important given later replacements)
        '#/([\'"])\+\'\'\+([\'"])\*#' => "/*" // restore comments in strings
    );

    $search = array_keys( $replace );
    $script = preg_replace( $search, $replace, $input );

    $replace = array(
        "&&\n" => "&&",
        "||\n" => "||",
        "(\n"  => "(",
        ")\n"  => ")",
        "[\n"  => "[",
        "]\n"  => "]",
        "+\n"  => "+",
        ",\n"  => ",",
        "?\n"  => "?",
        ":\n"  => ":",
        ";\n"  => ";",
        "{\n"  => "{",
        //  "}\n"  => "}", (because I forget to put semicolons after function assignments)
        "\n]"  => "]",
        "\n)"  => ")",
        "\n}"  => "}",
        "\n\n" => "\n"
    );

    $search = array_keys( $replace );
    $script = str_replace( $search, $replace, $script );

    return trim( $script );
}


foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator(__DIR__)) as $file) {
    $file = (string)$file;
    $fileArr = explode('.', $file);
    if (strtolower(array_pop($fileArr)) != "js")
        continue;

    $ret .= "\n//===> From file: $file\n";
    $ret .= file_get_contents($file);
}

//if ( ! isset ($_GET["debug"]))
//    $ret = js_strip_whitespace($ret);

echo $ret;