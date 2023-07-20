<?php

class AES {
    function encrypt($input){
        $data = str_split($input);
        $state = array();
        $count 	= 0;
        $this->pos_w = 0;
        for($i=0; $i<4; $i++){
            for($j=0; $j<4; $j++) {
                if ($count < count($data)){
                    $state[$i][$j] = ord($data[$count]);
                } else{
                    $state[$i][$j] = 0;
                }
                $count++;
            }
        }
        for($i=0; $i<4; $i++){
            for($j=0; $j < $this->Nb; $j++) {
                $state[$i][$j] = $state[$i][$j] ^ $this->w[$i][$this->pos_w + $j];
            }
        }
        $this->pos_w = $this->pos_w + $this->Nb;
    
        for ($i=0; $i<$this->Nr-1; $i++) {
            $state = $this->SubByte($state);
            $state = $this->ShiftRow($state);
            $state = $this->MixColumns($state);
            $state = $this->AddRoundKey($state);
            $this->pos_w = $this->pos_w + $this->Nb;
        }
        $state = $this->SubByte($state);
        $state = $this->ShiftRow($state);
        $state = $this->AddRoundKey($state);
        $cipher = "";
        foreach($state as $state){
            foreach($state as $data) {
                $cipher .= chr($data);
            }
        }
        return $cipher;
    }
}