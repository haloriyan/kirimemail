<?php
// RC4 encryption function
function rc4Encrypt($data, $key)
{
    $state = array();
    $x = $y = $index1 = $index2 = 0;

    // Key-scheduling algorithm
    for ($i = 0; $i < 256; $i++) {
        $state[$i] = $i;
    }

    for ($i = 0; $i < 256; $i++) {
        $index2 = (ord($key[$index1]) + $state[$i] + $index2) % 256;
        // Swap values
        $tmp = $state[$i];
        $state[$i] = $state[$index2];
        $state[$index2] = $tmp;
        $index1 = ($index1 + 1) % strlen($key);
    }

    // Pseudo-random generation algorithm
    $encrypted = '';
    for ($i = 0; $i < strlen($data); $i++) {
        $x = ($x + 1) % 256;
        $y = ($state[$x] + $y) % 256;
        // Swap values
        $tmp = $state[$x];
        $state[$x] = $state[$y];
        $state[$y] = $tmp;
        $encrypted .= $data[$i] ^ chr($state[($state[$x] + $state[$y]) % 256]);
    }

    return $encrypted;
}

// RC4 decryption function
function rc4Decrypt($data, $key)
{
    // RC4 encryption and decryption are the same operation
    return rc4Encrypt($data, $key);
}

// Example usage
$data = "Juan";
$key = "juanyoshep";

$encryptedData = rc4Encrypt($data, $key);
$decryptedData = rc4Decrypt($encryptedData, $key);

echo "Plaintext: " . $data . "\n";
echo "Encrypted: " . $encryptedData . "\n";
echo "Decrypted: " . $decryptedData . "\n";
