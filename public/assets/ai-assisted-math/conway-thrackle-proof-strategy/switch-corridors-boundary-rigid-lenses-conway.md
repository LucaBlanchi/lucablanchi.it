# Switch Corridors and Boundary-Rigid Lenses in Even Dumbbell Thrackles: An Incomplete Proof Architecture and Gap Audit

## Abstract

This note does not prove Conway's thrackle conjecture. It records an AI-assisted proof architecture that was initially drafted as a possible proof, together with a subsequent audit of the places where the argument is sound, conditional, or presently incomplete.

The program tries to reduce the internal even-dumbbell problem to a combination of switch-corridor regularization, support-gate disk classification, rank-one analysis at the common vertex, and certified edge-removal reductions. The audit shows that several bookkeeping and local geometric components can be made precise, but the central support-gate router is not closed. In particular, the remaining proof would still need a complete classification of label-essential support-gate disks containing original vertices, or an equivalent theorem producing certified edge-removal configurations with controlled triangles.

The useful output of the note is therefore not a finished proof, but a structured failure audit: it identifies which reductions are legitimate, which old formulations were too strong, and which residual lemmas would be needed before the strategy could become a proof.

## Current Status

This manuscript is a preliminary AI-assisted research note. It should be read as an incomplete proof architecture, not as a proof of Conway's thrackle conjecture and not as a proof that irreducible even dumbbell thrackles are $T_3$.

The strongest honest statement at the present stage is:

$$
\text{the strategy has a coherent blueprint, but its central router is open.}
$$

The main unresolved point is the classification of label-essential support-gate disks containing original vertices. The current audit disables all automatic uses of a smaller-core or R2-type reduction unless an explicit external certificate is supplied. The viable certified reduction route is R3, but R3 requires both a degree-two three-path candidate and an empty or controlled edge-removal triangle. Those certificates are not yet available in all residual cases.

## Declaration of Generative AI and AI-Assisted Technologies

During the preparation of this work, ChatGPT, by OpenAI, was used to assist with mathematical drafting, formalization, review, editing, and gap auditing. This work is shared as a preliminary AI-assisted mathematical note. The mathematical content may have been only partially reviewed and may contain errors; it should not be treated as peer-reviewed or as a fully verified manuscript.

## 1. Purpose of the Note

The original draft attempted to prove Conway's thrackle conjecture by the following high-level route:

$$
\text{Conway false}
\Rightarrow
\text{even dumbbell thrackle}
\Rightarrow
\text{irreducible even dumbbell thrackle}
\Rightarrow
T_3
\Rightarrow
|E|\le |V|.
$$

The external inputs in that route are standard structural ingredients: the even-dumbbell reduction and the theorem that $T_3$-thrackles satisfy Conway's inequality. The internal target was:

$$
\text{every irreducible even dumbbell thrackle is } T_3.
$$

This note no longer claims that internal target. Instead, it records the present state of the attempted internal proof.

## 2. Original Blueprint

Let

$$
F_{2a,2b}=C_{2a}\vee C_{2b}
$$

be an even dumbbell, with cycles $A=C_{2a}$ and $B=C_{2b}$ sharing the vertex $v$.

The intended strategy was:

1. Use a domain-incidence argument to select ordinary vertices $p,q$ on one cycle with disjoint incident-domain pairs.
2. Study the two complementary $p$-to-$q$ paths on that cycle.
3. Extract switch-corridor or support-gate witnesses carrying the nontrivial labelled transport.
4. Regularize clean $v$-free parts into support-switch ladders or closed support-switch trains.
5. Treat the path through $v$ by a singular rank-one analysis rather than as an ordinary support-switch cell.
6. Classify the label-essential support-gate loops that arise from raw closures, repeated cores, train normalization, or rank-one transfer.
7. Conclude by contradiction from either an impossible train, a legitimate complexity-lowering reduction, or a certified edge-removal operation.

After audit, the blueprint remains useful, but the last two items are not complete.

## 3. Corrections Introduced by the Audit

### 3.1. No automatic proof of the internal theorem

The old draft repeatedly stated that every irreducible even dumbbell thrackle is $T_3$. That statement is now only the desired target. It is not established by the current argument.

Any final section deriving Conway's conjecture from the internal theorem must therefore be read conditionally:

$$
\text{if the internal theorem were proved, then the external reduction would close Conway.}
$$

### 3.2. Anchored core carriers replace arbitrary minimal corridors

The old "minimal corridor" language was too loose. A globally minimal nontrivial disk corridor may have endpoints in the middle of a raw trace and need not be anchored at the selected vertices $p,q$. That is a problem because the ladder-closing step requires compatible endpoint data at $p$ and $q$.

The corrected object is an anchored core carrier: a witness that preserves the actual $p$-to-$q$ core trace, or else explicitly routes failures to a smaller closed walk, support-gate loop, R1 splice, rank-one marker case, train, or typed normality pathology.

### 3.3. The common vertex is singular

The common vertex $v$ cannot be treated as an ordinary support-switch cell. After auditing the local rotation, the separated rank-zero case is ruled out by a parity argument, but the surviving local model is still rank-one, not full-rank.

With local sectors denoted by

$$
S_A,\quad S_1,\quad S_B,\quad S_2,
$$

the ordinary continuations are

$$
c_A:S_A\to S_A,\qquad c_B:S_B\to S_B,
$$

while the mixed transitions are marked singular transitions

$$
m_A:S_2\Rightarrow S_1,\qquad m_B:S_1\Rightarrow S_2.
$$

The arrows $\Rightarrow$ are not ordinary lane continuations. They record rank-one marker uses at $v$.

### 3.4. The M-distinct boundary-component formulation was wrong

The old M-distinct argument used a regular-neighborhood boundary component of the planarized drawing $A\cup B$. That formulation is not reliable: planarized crossings change the first Betti number, and distinct mixed sectors need not lie on a single geometric face-boundary component.

The corrected object is a finite closed mixed support-gate state trace

$$
L_{\mathrm{mix}}=A_{\mathrm{mix}}\cup B_{\mathrm{mix}},
$$

where $A_{\mathrm{mix}}$ and $B_{\mathrm{mix}}$ carry the two opposite marked singular transitions. Cancellation then requires a marked-collapse or same-relation transfer argument; it is not a local ordinary cancellation.

### 3.5. Labelled witnesses must be typed

The reduction language now uses typed labelled witnesses. A boundary relation is not just an order relation between endpoints; it must remember typed terminal states, global domain labels, orientation data, and marker records.

In particular, two appearances on the same geometric support or gate interval are not automatically the same state. They are the same state only if the active support/gate, side, domain-label, orientation, boundary-role, and marker data agree.

This prevents false collapses, false gate identifications, and false repeated-support reductions.

### 3.6. Pathology is not a terminal proof word

The word "pathology" is now only shorthand for a finite routed ledger:

- terminal lane;
- returning lane;
- branching or merging;
- gate identification;
- repeated support;
- double crossing;
- cell overlap.

Each such event must immediately route to a labelled collapse, a same-relation splice, a smaller label-essential support-gate loop, a smaller train, a rank-one marker case, a certified R3 configuration, or a direct thrackle contradiction. If no such route is named, the case is unresolved.

### 3.7. R2 is disabled without an external certificate

The old phrase "relevant inner domain" hid too much. In a pure even dumbbell, a disk containing original vertices does not automatically contain a proper smaller even dumbbell obstruction.

The corrected policy is:

$$
\text{do not invoke R2 unless an explicit compression or replacement-edge certificate is supplied.}
$$

Under the present pure-dumbbell blueprint, R2 is a disabled placeholder. Apparent R2b edge-removal cases should be treated as R3 candidates. Apparent R2c replacement-edge cases require a separate theorem.

### 3.8. R3 needs a controlled triangle

The certified R3 route is valid only when an exact edge-removal configuration is exhibited. It requires:

1. a degree-two three-path $x_0x_1x_2x_3$;
2. the correct crossing of the first and third edges;
3. an empty, inessential, or otherwise controlled triangle bounded by the middle edge and the corresponding subarcs;
4. persistence of the relevant non-$T_3$ obstruction after edge removal.

Long path-like components avoiding $v$ and long arms in $v$-containing disks give plausible degree-two three-path candidates. They do not by themselves give the controlled triangle certificate.

## 4. Blocks That Look Blindable

The following blocks appear solid enough to be incorporated into a future clean manuscript, subject to ordinary checking and notation cleanup.

### 4.1. Rotation parity at the common vertex

The rank-zero local rotation at $v$ is ruled out in even dumbbells by an immersed-arc parity argument. After deleting a small disk around $v$, the two cycles give arcs with an even number of mutual crossings, so the endpoint pattern on the boundary cannot alternate in the separated way.

### 4.2. Typed rank-one marker at $v$

The local interface at $v$ is correctly modelled by ordinary continuations $c_A,c_B$ and marked singular transitions $m_A,m_B$. The mixed transitions must remain marked until a separate cancellation or same-relation replacement is certified.

### 4.3. Labelled witness operations

The abstract minimality operations are sound once their hypotheses are met:

- full-labelled identity deletion;
- same-relation two-terminal splice;
- rank-defect-lowering replacement.

The important correction is that these operations preserve full typed labelled relations, not merely endpoint order.

### 4.4. Cell-only support-gate disks

For a cell-clean support-gate disk containing only support-switch cells, the finite incidence graph argument is essentially graph-theoretic. Under typed normality and labelled-collapse hypotheses, it routes cyclic components to smaller trains and acyclic components to smaller loops, collapses, or typed normality failures.

### 4.5. Pure dumbbell port graph bookkeeping

Inside a pure even dumbbell, original-vertex disk contributions have no hidden automatic smaller-core form. They route to path pieces, $v$-arms, support-gate boundary closures, whole-cycle or whole-dumbbell cases, certified R3, explicit external R2, or the typed normality ledger.

## 5. Central Open Block

The central support-gate theorem should currently be stated only as a conditional router:

$$
\begin{aligned}
\text{innermost label-essential support-gate loop}
\Rightarrow {}&
\text{smaller train}\\
&\text{or typed ledger pathology}\\
&\text{or R1 splice}\\
&\text{or rank-one }v\text{ marker package}\\
&\text{or labelled collapse}\\
&\text{or certified R3}\\
&\text{or explicit external R2 obligation.}
\end{aligned}
$$

This is not yet a proof, because two outputs are not automatically contradictions:

1. R2 is disabled unless a new external certificate is supplied.
2. R3 is certified only after both the degree-two three-path and the controlled triangle have been produced.

Thus the main missing theorem is one of the following:

1. prove that every residual original-vertex support-gate disk supplies a certified R3 edge-removal triangle;
2. prove a new legitimate external R2 compression or replacement-edge theorem;
3. reroute all residual cases to R1, rank-one marker descent, labelled collapse, smaller train, or typed normality contradictions.

## 6. What the Complexity Ideas Contribute

The complexity viewpoint remains useful, but it is not currently a complete engine for the proof. Its useful contribution is proof accounting:

- every collapse or splice must preserve the full typed labelled boundary relation;
- every replacement must lower a declared lexicographic complexity;
- rank-one marker defects at $v$ must be counted before ordinary support-gate length;
- marker-only normal $v$-ears must not be fed back into the ordinary support-gate theorem as if they were new exterior essentiality;
- a "smaller" object must be smaller in the appropriate global, witness, loop, train, or marker hierarchy.

This accounting prevents several false reductions. It has not yet produced the missing geometric certificate needed to close the proof.

## 7. Current Verdict

The present document should be classified as:

$$
\text{incomplete proof architecture plus gap audit.}
$$

It contains useful components and a more honest map of the proof landscape, but it does not prove Conway's thrackle conjecture. In particular, it does not prove that every irreducible even dumbbell thrackle is $T_3$.

The next mathematical target is the residual support-gate disk problem: either certify R3 in all remaining cases, or replace the R3 branch by a different legitimate descent theorem.

## References

[LPS97] L. Lovasz, J. Pach, and M. Szegedy, *On Conway's thrackle conjecture*, Discrete & Computational Geometry 18(4) (1997), 369-376.

[CN00] G. Cairns and Y. Nikolayevsky, *Bounds for generalized thrackles*, Discrete & Computational Geometry 23(2) (2000), 191-206.

[MN18] G. Misereh and Y. Nikolayevsky, *Annular and pants thrackles*, Discrete Mathematics & Theoretical Computer Science 20(1) (2018), Article #16.

[FP11] R. Fulek and J. Pach, *A computational approach to Conway's thrackle conjecture*, Computational Geometry: Theory and Applications 44(6-7) (2011), 345-355.

[Xu21] Y. Xu, *A new upper bound for Conway's thrackles*, Applied Mathematics and Computation 389 (2021), Article 125573.
