<?php

namespace Tests\Unit;

use App\Services\SuperMemo;
use PHPUnit\Framework\TestCase;

class SuperMemoTest extends TestCase
{
    protected $supermemo;

    public function setUp(): void
    {
        $this->supermemo = new SuperMemo();
    }

    public function dataProvider()
    {
        return [
            [2, 0, 0, 2.5, ['interval' => 1, 'repetitions' => 0, 'easeFactor' => 2.1799999999999997]],
            [3, 0, 0, 2.5, ['interval' => 1, 'repetitions' => 1, 'easeFactor' => 2.36]],
            [4, 0, 0, 2.5, ['interval' => 1, 'repetitions' => 1, 'easeFactor' => 2.5]],
            [5, 0, 0, 2.5, ['interval' => 1, 'repetitions' => 1, 'easeFactor' => 2.6]],
            [2, 1, 0, 2.1799999999999997, ['interval' => 1, 'repetitions' => 0, 'easeFactor' => 1.8599999999999997]],
            [3, 1, 0, 2.1799999999999997, ['interval' => 1, 'repetitions' => 1, 'easeFactor' => 2.0399999999999996]],
            [4, 1, 0, 2.1799999999999997, ['interval' => 1, 'repetitions' => 1, 'easeFactor' => 2.1799999999999997]],
            [5, 1, 0, 2.1799999999999997, ['interval' => 1, 'repetitions' => 1, 'easeFactor' => 2.28]],
            [2, 1, 1, 2.36, ['interval' => 1, 'repetitions' => 0, 'easeFactor' => 2.04]],
            [3, 1, 1, 2.36, ['interval' => 6, 'repetitions' => 2, 'easeFactor' => 2.2199999999999998]],
            [4, 1, 1, 2.36, ['interval' => 6, 'repetitions' => 2, 'easeFactor' => 2.36]],
            [5, 1, 1, 2.36, ['interval' => 6, 'repetitions' => 2, 'easeFactor' => 2.46]],
            [2, 1, 1, 2.5, ['interval' => 1, 'repetitions' => 0, 'easeFactor' => 2.1799999999999997]],
            [3, 1, 1, 2.5, ['interval' => 6, 'repetitions' => 2, 'easeFactor' => 2.36]],
            [4, 1, 1, 2.5, ['interval' => 6, 'repetitions' => 2, 'easeFactor' => 2.5]],
            [5, 1, 1, 2.5, ['interval' => 6, 'repetitions' => 2, 'easeFactor' => 2.6]],
        ];
    }

    /**
     * @dataProvider dataProvider
     */
    public function testCalculateSupermemo($quality, $oldInterval, $oldRepetitions, $oldEaseFactor, $expectedData)
    {
        $this->assertEquals(
            $this->supermemo->calculate($quality, $oldInterval, $oldRepetitions, $oldEaseFactor),
            $expectedData
        );
    }
}
