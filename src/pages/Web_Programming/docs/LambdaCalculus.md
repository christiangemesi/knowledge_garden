### Lambda calculus

**α (alpha)**: Rename parameter => translation

```javascript
const x => x;
// or
const y => y;
```

**β (beta)**: Apply argument => reduction, from left to right

```javascript
((f) => (x) => f(x))(id)(1)
    // replace f on the left with id from first argument
    ((x) => id(x))(1)

// replace x on the left with 1 from first (next) argument
id(1)
    // replace id with its definition
    (x) => x (1);
// replace x on the left with 1 from first argument
1;
```

**η (eta)**: Cancel parameter => reduction, from right to left

```javascript
(x) => (y) => plus(x)(y);
// remove y as most right parameter
(x) => plus(x);
// remove x as next right parameter
plus;
```

**Boolean**: expressed with functions and values

```javascript
// background
const id = (x) => x;
const fst = (x) => (y) => x; //konst
const snd = (x) => (y) => y;

// basic booleans
const T = fst;
const F = snd;

// boolean shortcuts
const and = (p) => (q) => p(q)(p);
const or = (p) => (q) => p(p)(q);
const not = (p) => p(F)(T);
```

**Replication**: reduced expression results in original expression at the beginning

```javascript
// background
const M = (ƒ) => ƒ(ƒ);
const Y = M(M);

// reduction of Y
Y = M(M)(
    // replace M
    (ƒ) => ƒ(ƒ)((ƒ) => f(ƒ))
)(
    // α transition - second () ƒ to g
    (ƒ) => ƒ(ƒ)((g) => g(g))
)(
    // β reduction - g(g) for all ƒ in first ()
    (g) => g(g)((g) => g(g))
)(
    // α transition - all g to ƒ
    (ƒ) => ƒ(ƒ)((ƒ) => f(ƒ))
);
```

**Accessor functions**: lazy until applied

- fst/ True
- snd/ False

**Datatype pair**: two-couple of values, immutable

```javascript
const pair = (a) => (b) => (ƒ) => f(a)(b);
const firstname = fst;
const lastname = snd;

const person = pair("John")("Smith");
name = pair(firstname) + " " + pair(lastname);
```

**Datatype triple**: three-couple of values, immutable

```javascript
const triple = (a) => (b) => (c) => pair(par(a)(b))(c);
const firstname = (p) => fst(fst(p));
const lastname = (p) => snd(fst(p));
const age = (p) => snd(p);

const person = triple("John")("Smith")(30);
name = triple(firstname) + " " + triple(lastname) + ", Alter " + triple(age);
```

**Complement**: take one from two functions

```javascript
const left = (a) => (f) => (g) => f(x);
const right = (a) => (f) => (g) => g(x);
const either = (e) => (f) => (g) => e(f)(g);

// eta reduction
const either = id;

// usage
// functionWithParameters contains functions left and right
functionMayGoWrong(leftFunction /*  bad case */)(rightFunction /* good case */);
```


### Lambda Calculus History

**Lambda syntax**:

```javascript
// definition
expression:: = variable     // identifier
    | expression
expression   // application
| λ
variable.expression // abstraction
| (expression)            // grouping

// abstraction
λ
parameters.expression // lambda notation
parameters => expression // js notation
```

**Variables**: all immutable\
**Functions**: all unary => curry functions

```javascript
ƒab = f(a)(b)
(ƒa)
b = (f(a))(b)
ƒ(ab) = f(a(b))
```

**Lambda rule**: tries to bind as much as possible to the right side

```javascript
λa.bx = a => b(x)
(λa.b)
x = (a => b)(x)
λa.λb.x = λab.x = a => b => x
```

**β-reduction**: replace variables on the left side with expression form the right side. Start from the inside and go
out

```javascript
((λa.a)
λb.λc.b
)
(x)
λe.ƒ
(λb.λc.b)(x)
λe.ƒ
(λc.x)
λe.ƒ
x // beta normal form
```

**Combinator**: lambda functions

- Idiot/ Identity: `I = x => x` with lambda `λa.a` for id
- Mockingbird: `M = f => f(f)` with lambda `λƒ.ƒƒ`
- Kestrel: `K = a => b => a` with lambda `λab.a` for `const`
- Kite: `KI = CK = a => b => b` with lambda `λab.b` for const id
- Cardinal: `C = f => a => b => f(b)(a)` with lambda `λƒab.ƒba` for flip

**Boolean operations**: lambda has no normal boolean

- TRUE: `T = K = λab.a` with javascript `a => b => a`
- FALSE: `F = KI = λab.b` with javascript `a => b => b`
- Negation: `NOT = C = λp.pFT` with javascript `!p = p => p(F)(T)`
- Conjunction: `AND = λpq.pqF` / `λpq.pqp` with javascript `p && q = p => q => p(q)(F)` / `p => q => p(q)(p)`
- Disjunction: `OR = λpq.pTq` / `λpq.ppq` with javascript `p || q = p => q => p(T)(q)` / `p => q => p(p)(q)`
- Exclusive or: `XOR = M = λpq.p(qTF)(qFT)` with javascript `p XOR q = p => q => p(qTF)(qFT)`
- Boolean equality: `BEQ = λpq.pq(NOT q)` with javascript `p == q = p => q => p(q)(!q)`

**Divers**: extension means input = output
---

### Lambda Calculus II

**Combinator**: lambda functions

- Bluebird: `B = f => g => f(g(a)` with lambda `λƒga.ƒ(ga)` for composition
- Thrush: `Th = CI = a => f => f(a)` with lambda `λaƒ.ƒa`
- Vireo: `V = BCT = a => b => f => f(a)(b)` with lambda `λabƒ.ƒab`
- Blackbird: `Bl = BBB = f => g => a => b => f(g(a)(b))` with lambda `λƒgab.ƒ(gab)`

**Numbers**: defined als folds

- 0 / ZERO: `N0 = F = λƒa.a` with javascript `f => a => a`
- 1 / ONCE: `N1 = I = λƒa.ƒa` with javascript `f => a => f(a)`
- 2 / TWICE: `N2 = λƒa.ƒ(ƒa)` with javascript `f => a => f(f(a))`
- 3 / THRICE: `N3 = λƒa.ƒ(ƒ(ƒa))` with javascript `f => a => f(f(f(a)))`
- 4 / FOURFOLD: `N4 = λƒa.ƒ(ƒ(ƒ(ƒa)))` with javascript `f => a => f(f(f(f(a))))`
- 5 / FIVEFOLD: `N5 = λƒa.ƒ(ƒ(ƒ(ƒ(ƒa))))` with javascript `f => a => f(f(f(f(f(a)))))`
- 6 / SIXFOLD: `N6 = λƒa.ƒ(ƒ(ƒ(ƒ(ƒ(ƒa)))))` with javascript `f => a => f(f(f(f(f(f(a))))))`
- 7 / SEVENFOLD: `N7 = λƒa.ƒ(ƒ(ƒ(ƒ(ƒ(ƒ(ƒa))))))` with javascript `f => a => f(f(f(f(f(f(f(a)))))))`
- 8 / EIGHTFOLD: `N8 = λƒa.ƒ(ƒ(ƒ(ƒ(ƒ(ƒ(ƒ(ƒa)))))))` with javascript `f => a => f(f(f(f(f(f(f(f(a))))))))`
- 9 / NINEFOLD: `N9 = λƒa.ƒ(ƒ(ƒ(ƒ(ƒ(ƒ(ƒ(ƒ(ƒa))))))))` with javascript `f => a => f(f(f(f(f(f(f(f(f(a)))))))))`

**Operations**:

- Successor: `SUCC = λnƒa.ƒ(nƒa)` with javascript `n => f => a f(n(f)(a))` for '$number+1$' (`number++`)
- Addition: `ADD = λnk.n SUCC k` with javascript `n => k => n(SUCC(k))` for $n + k$
- Multiplication: `MULT = B = λnkƒ.n(kƒ)` with javascript `n => k => n(k(f))` for $n * k$
- Power: `POW = λnk.kn` with javascript `n => k => k(n)` for $n^k$
- Predecessor: `PRED = λn.FST(nΦ(PAIR N0 N0))` with javascript `n => FST(n(PHI)(PAIR(N0)(N0)))` for
  $number-1$ (`number--`)
- Subtraction: `SUB = λnk.k PRED n` with javascript `n => k => k(PRED)(n)` for $n - k$

**Equality functions**:

- Is 0: `IS0 = λn.n(KF)T` with javascript `n => n(K(F))(T)` for $n == 0$
- Less equal: `LEQ = λnk.IS0(SUB n k)` with javascript `n => k => IS0(SUB(n)(k))` for $n ≤ k$
- Equal: `EQ = λnk.AND((LEQ n k)(LEQ k n))` with javascript `n => k => IS0(SUB(n)(k))` for $n == k$
- Greater than: `GT = Bl NOT LEQ = λnk.NOT(LEQ n k)` with javascript `n => k => NOT(LEQ(n)(k))` for $n > k$

**Divers**:

- Pair: `PAIR = V = λabƒ.ƒab` with javascript `a => b => f => f(a)(b)`
- First: `FST = λp.pK` with javascript `p => p(K)`
- Second: `SND = λp.pKI` with javascript `n => p(KI)`
- Phi / Φ: `Φ = λp.V(SND p)(SUCC (SND p))` with javascript `p => PAIR(SND(p)(SUCC(SND(p))))`

---
