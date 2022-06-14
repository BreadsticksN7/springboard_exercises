Step One: Simplifying Expressions<br>
Simplify the following big O expressions as much as possible:<br>
<br>
O(n + 10)<br>
--O(n)<br>
O(100 * n)<br>
--O(n)<br>
O(25)<br>
--O(1)<br>
O(n^2 + n^3)<br>
--O(n^3)<br>
O(n + n + n + n)<br>
--O(n)<br>
O(1000 * log(n) + n)<br>
--O(n)<br>
O(1000 * n * log(n) + n)<br>
--O(n log n)<br>
O(2^n + n^2)<br>
--O(2^n)<br>
O(5 + 3 + 1)<br>
--O(1)<br>
O(n + n^(1/2) + n^2 + n * log(n)^10)<br>
--O(n^2)<br>
<br><br>

Step Two: Calculating Time Complexity<br>
<br>
1. O(n)<br>
2. O(n)<br>
3. O(1)<br>
4. O(n)<br>
5. O(n^2)<br>
6. O(n)<br>
<br><br>

Step Three: Short Answer<br>
<br>
--True or false: n^2 + n is O(n^2). True<br>
--True or false: n^2 * n is O(n^3). True<br>
--True or false: n^2 + n is O(n). False<br>
--What’s the time complexity of the .indexOf array method? O(n)<br>
--What’s the time complexity of the .includes array method? O(n)<br>
--What’s the time complexity of the .forEach array method? O(n) at least (depends on what the callback does)<br>
--What’s the time complexity of the .sort array method? O(n log n)<br>
--What’s the time complexity of the .unshift array method? O(n)<br>
--What’s the time complexity of the .push array method? O(1)<br>
--What’s the time complexity of the .splice array method? O(n) it can be O(1) if the end, but we can’t assume that<br>
--What’s the time complexity of the .pop array method? O(1)<br>
--What’s the time complexity of the Object.keys() function? O(n)<br>
--What’s the space complexity of the Object.keys() function? O(n)<br>