<?php

dataset('credentials', function () {
    $email = fake()->email();
    $ip = fake()->ipv4();

    return [
        'first attempt' => [$email, $ip, false],
        'second attempt' => [$email, $ip, false],
        'third attempt' => [$email, $ip, false],
        'fourth attempt' => [$email, $ip, false],
        'fifth attempt' => [$email, $ip, false],
        'sixth attempt' => [$email, $ip, true],
    ];
});
