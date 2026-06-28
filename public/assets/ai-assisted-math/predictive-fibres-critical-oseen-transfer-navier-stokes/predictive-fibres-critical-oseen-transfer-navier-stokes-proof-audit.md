# Predictive Fibres / Navier-Stokes Proof Audit

Status snapshot: 2026-06-28.

This is a working proof-audit log for the Navier-Stokes predictive-fibre program. It is intentionally separate from the TeX/PDF paper. The TeX and PDF should not be regenerated from this file.

Temporary detailed working files live in:

`/private/tmp/ns-presentation-audit`

## Latest Snapshot: S4 Packet Compatibility Owner Matrix

The temporary audit has now decomposed the S4 packet-compatibility source contract
into named owner subchannels. The newest local block is
`293-s4-margin-floor-owner-theorem.md`, registered as L166 in
`02-closed-lemmas.md`.

Closed locally/formally: the S4 compatibility ledger now has owners for packet
environment frames, native norms, carrier sectors, dictionary components, owner
splits, certified-old physical subtraction, packet envelopes, and margin/floor
compatibility. The final margin/floor subchannel has exactly four legal outcomes:
fixed positive margin, registered margin comparison, finite update or floor
recompute, and named escape/gate.

The recorded local estimate is:

`sum_{k in B} MarginPktCompat_k <= C_S4,margin sum_{k in B} MarginOwner_k`,

where

`MarginOwner_k = ShrinkOwner_k + GraphMarginOwner_k + CertMarginOwner_k + PacketEnvMarginOwner_k + FloorOwner_k + BoundaryOwner_k`.

This closes only the formal S4 bookkeeping layer. It does not yet prove that
genuine Navier-Stokes packet epochs have the required fixed positive margins, nor
that the six margin owners are globally summable. Those are still PDE/source
theorems to be proved through E10/E11/E12, S11/S12, finite-variation control, and
the final global cost assembly.

## Previous Snapshot: Force/Pressure/Gauge Closure Layer

The current temporary audit has added a force/pressure closure layer on top of the
C1/GQ1 repair. The key new ledgers are:

1. `169-native-yforce-transition-comparison.md`: Hilbert force comparison alone is
   not enough; force defects used in Oseen/compactness arguments must also be small
   in the native `Y_force` topology, or pay transition error/escape.
2. `171-pressure-gauge-yforce-coupling-ledger.md`: only spatially constant pressure
   gauge changes are free. Nonconstant pressure transfers change `grad pi` and must
   be paid through native force, pressure/gauge, cutoff/chart error, escape, or gate.
3. `173-pressure-shrink-margin-compatibility.md`: harmonic pressure decay may use an
   inner shrink only when `theta_P`, the pressure allowance, block-length slots, and
   gate/graph margin losses have already been stored in the chart.
4. `174-turn64-status.md`: latest temporary snapshot for the pressure-shrink audit.

The repaired zero-cost package now requires the block cost to drive to zero not only
for `Innov`, `RecTail`, certified span gaps, and forced-lift use, but also for native
`Y_force` transition defects, pressure-force gauge coupling, and pressure-shrink
margin exhaustion. Otherwise the chain must pay named escape or open the CKN gate.

Closed locally/formally: no free nonconstant pressure-gauge transfer; no free Hilbert
to native force transition; no after-the-fact harmonic pressure shrink; no silent
CKN/graph margin overdraft. These are bookkeeping closures, not yet global PDE
theorems.

Still open globally/PDE: prove actual no-gate finite-cost chains enter bounded
pressure-envelope charts, prove the total shrink stack does not degenerate, prove all
pressure/force/cutoff/certificate/transport margin losses remain compatible, and
prove the final repaired cost is summable along genuine Navier-Stokes chains.

## Previous Snapshot: C1/GQ1 Repair

The repaired cost is now tracked as

`Q_k^rep = Innov_k + Err_k^rep + Esc_k^rep`,

where native zero-cost tails are grouped into `RecTail_k` and must be paid by the
repaired error/escape ledger. The global cost statement `sum_k Q_k^rep < infinity` is
now decomposed into ten component theorems: Hilbert innovation, transport/chart
errors, Hilbert memory tail, normal critical tail, force tail, pressure/gauge tail,
cutoff/localization tail, carrier/microlocal tail, certificate tolerances, and
graph/rank/realizer escapes.

For the Hilbert innovation component C1, the purely formal Bessel lemma is no longer
the whole story. The exact target is now:

`d_k = A_k R + rho_k`

inside a critical parabolic square-function source `K_crit`, with finite
`||R||_Kcrit`, square-summable repaired errors, and a Bessel estimate for the
pulled-back innovation witnesses `A_k^* e_k`.

The concrete model for `K_crit` is a critically normalized parabolic molecule frame:
coefficients are scale-critical, and no weak Sobolev weighting is allowed merely to
make all distributions finite. The abstract Bessel part is closed by standard
finite-overlap, Schur-Gram, or Carleson packet criteria for the molecule packet rows.

What remains open is the Navier-Stokes instantiation: prove that the actual global
residual has finite `K_crit` norm, prove the full repaired identity including
pressure/force/cutoff/gauge/carrier components, prove the witnesses are controlled
molecule packets, prove the packet bounds along actual bad chains, and preserve
critical witness lower bounds after quotienting old memory and certified atoms.

## Current Strategy

The original modular theorem is being converted into a non-conditional theorem by replacing each analytic module with a proved lemma, or by isolating the precise theorem that remains to be proved.

The most promising route is now `Architecture B`: use smooth forced/Stokes predictors as presentation objects, not necessarily exact Navier-Stokes strong solutions. The equation defect of the predictor is then paid as a registered observable cost.

This avoids hiding strong 3D well-posedness inside the definition of "predictor".

## Closed Or Locally Closed Blocks

1. Oseen energy transfer around a Serrin drift, provided pressure-tail is an explicit budget.
2. Relative CKN predictive epsilon: small predictor CKN plus small residual CKN implies regularity by classical CKN.
3. Energy-to-relative-CKN bridge: small residual local energy plus pressure-tail gives small residual CKN on an inner cylinder.
4. Abstract predictor-map analyticity for Banach fixed-point predictors.
5. Forced/Stokes predictor nonemptiness for finite-dimensional observation maps.
6. Realization defect removal: use actual `eta_k`-minimizing predictors instead of relaxed convex centres.
7. Abstract Hilbertian innovation packing.
8. Two-mode null classification for pure Fourier modes.
9. Beltrami absorption.
10. Exact two-and-a-half-dimensional reduction.
11. Abstract no-persistent-defect iteration.
12. Formal Carleson scale-selection lemma, assuming summable scale costs.
13. Finite-observable blindness obstruction: finite incoming observations do not control relative CKN on an infinite-dimensional residual class.
14. Architecture B master reduction: global cost finiteness plus a bad-block defect theorem imply no persistent bad chain.
15. Critical-density obstruction: finite local energy does not imply summability of critical dyadic scale costs.
16. Innovative-cost accounting: if defects are transported into one Hilbert space, `C_k` is the squared orthogonal innovation and `sum C_k` follows by Bessel.
17. Bad-block compactness/rigidity template: the bad-block theorem follows from critical compactness, zero-cost rigidity, branch capture, and quantitative stability.
18. Critical compactness audit: the plausible route is Aubin-Lions strong `L^2_loc` plus uniform `L^{10/3}` to recover strong `L^3_loc`; exact residual time-derivative bounds remain to be proved.
19. Aubin-Lions residual compactness: energy bounds plus `partial_t w` in `L^{3/2}W^{-1,3/2}` and uniform `L^{10/3}` imply strong `L^3_loc`.
20. Pressure compactness: strong residual `L^3` convergence gives local pressure `L^{3/2}` convergence by Calderon-Zygmund; pressure tails are explicit costs or harmonic compact terms.
21. Residual equation bookkeeping: the Architecture B residual equation identifies the exact predictor defect, pressure, and nonlinear terms needed for compactness.
22. Zero-cost rigidity obstruction: zero Leray-projected nonlinear leakage does not force only Beltrami or 2.5D; general Euler-coherent pure-pressure branches must be allowed.
23. Euler-coherent branch capture: if a zero-cost limit is Euler-coherent and CKN-controlled, using the limit as an Architecture B predictor opens the relative CKN gate.
24. Full-state normal defect definition: define normal defect as localized `P div(u tensor u)`, with cutoff/tail errors registered separately; zero normal defect implies Euler-coherence.
25. Euler-coherent Navier-Stokes regularity: if a zero-cost limit is both Navier-Stokes and Euler-coherent, it solves a linear Stokes system and is smooth.
26. Corrected zero-cost rigidity: compact NS limit plus vanishing full-state normal defect gives a smooth Stokes branch and opens the relative CKN gate on a smaller cylinder.
27. Navier-Stokes limit passage: strong `L^3_loc` velocity and strong `L^{3/2}_loc` pressure convergence pass the NS equations to the limit.
28. Normal-defect limit passage: strong `L^3_loc` convergence passes localized full-state normal defects to the limit.
29. Vanishing-cost limit package: non-carrier vanishing-cost bad blocks satisfying registered compactness hypotheses cannot remain bad.
30. Carrier escape dichotomy: carrier escape is noncompactness modulo admissible recentering; vanishing carrier cost returns to the compact package, positive escape is paid as registered cost.
31. Registered compactness cost: a local profile of envelope bounds and vanishing defects implies the hypotheses of the vanishing-cost package.
32. Two-level budget schema: envelope boundedness gives compactness; innovative defect summability gives finite bad-block budget.
33. Quantitative stability from compactness: on compact envelope-bounded block classes, qualitative zero-cost contradiction implies a positive cost floor `c(delta,M,m)`.
34. Global observable Hilbert architecture: registered defects are transported into a Hilbert-dual observable space `H_def`; global cost finiteness follows from a Bessel-frame representation `d_k = A_k R + rho_k` plus square-summable transport errors.
35. Critical witness compatibility obstruction: the global residual space must simultaneously give finiteness, Bessel finite-overlap, and scale-critical witnessing of bad blocks; very weak Sobolev choices can make cost finite but too weak to prove regularity.

## Current Main Open Blocks

After the master reduction, the remaining proof burden is concentrated in two PDE statements:

1. Global cost finiteness: the total registered cost along every controlled predictive chain is finite.
2. Bad-block defect theorem: every persistently bad block either opens the relative CKN gate or pays a positive registered cost.

These two statements expand into the following concrete tasks:

1. Instantiate the formal global Hilbert representation as a Navier-Stokes PDE/frame theorem: construct a scale-critical `K`, `R`, `A_k`, and prove the Bessel finite-overlap bound for transported innovation witnesses without losing bad-block detection.
2. Prove square-summability of pressure, cutoff, gauge, holonomy, and localization transport errors, or charge non-summable parts as positive escape.
3. Prove envelope boundedness for controlled singular chains, or define and charge envelope escape.
4. Construct concrete carrier parameter space and admissible recentering calculus.
5. Prove pressure/defect transport estimates under recentering.
6. Prove compactness of envelope-bounded block classes modulo recentering.
7. Prove stability of predictive defect/no-gate conditions in the compact topology.
8. Re-run no-circularity audit for every proposed PDE closure.
9. Prove actual source outcomes for the S4 owner subchannels isolated in `277`,
   `279`, `281`, `283`, `285`, `287`, `289`, `291`, and `293`.
10. Prove the independent `ErrS1repr`/`EscPkt` source theorem and the true S1 row
    Bessel/Carleson theorem for actual Navier-Stokes rows.
11. Close E12's exact floor theorem and the S2-S12/VarEff finite-variation layer.
12. Assemble the final non-conditional theorem without borrowing any margin from
    S1, final GQ1, or after-the-fact threshold choices.

## Key Warning

Finite local energy alone does not imply small normalized critical energy at a candidate singular point. Any proof must produce a genuine summability, Carleson, compactness, or rigidity mechanism. Otherwise the argument simply restates the Navier-Stokes regularity problem.

## Preferred Next Target

The next block to attack is the PDE block alternative in Architecture B:

Persistent predictive defect on a fixed-length scale block should imply either:

1. relative CKN smallness on a smaller cylinder;
2. a registered normal/pressure/carrier/forcing defect bounded below;
3. entry into a rigid branch already known to be regular.

This is the first point where packet rigidity and global residual representation must interact.

## Current Obstruction

Finite observation matching is not enough. In presentation-theoretic terms, the incoming observation map has large invisible fibres. Unless the observation family is norming for relative CKN, every CKN-large invisible direction must be shown to produce registered defect cost. This is why the bad-block defect theorem is structurally necessary, not merely a technical embellishment.

Likewise, global cost finiteness cannot come from raw finite energy alone. Critical normalized densities may remain order one on infinitely many nested scales while the underlying measure is finite. The cost must count genuinely new/orthogonal defects, not the same concentration repeatedly.

The current definition of the intended registered cost is therefore: transport each scale defect into a common Hilbert-dual observable space and set `C_k` equal to the squared norm of its component orthogonal to the span of previous transported defects. The sharpened formal package is now `d_k = A_k R + rho_k`: a global residual vector `R`, transport maps `A_k`, a Bessel finite-overlap bound for the pulled-back innovation witnesses `A_k^* e_k`, and square-summable errors `rho_k`. Under those hypotheses, Bessel gives `sum C_k < infinity`.

The current zero-cost branch set has also been enlarged. Beltrami and 2.5D/shear are useful exact sub-branches, but zero projected nonlinearity more generally means the nonlinearity is pure pressure, i.e. an Euler-coherent branch. The proof should use this intrinsic branch set unless a stronger normal defect is added.

With the corrected branch set, zero-cost rigidity is no longer a classification problem into a short geometric list. If the zero-cost limit is Navier-Stokes and its full-state normal defect vanishes, then the nonlinear term is pure pressure and the limit satisfies a linear Stokes system. That branch is smooth and is captured by the relative CKN gate after shrinking the cylinder.

The newest guardrail is that the global residual Hilbert space must not be chosen only
to make distributions finite. It must be scale-critical enough to witness a persistent
no-gate bad block with a uniform lower bound, while still giving a Bessel
finite-overlap estimate after transport. A parabolic molecule/wavelet square-function
space is the plausible route, but the Navier-Stokes pressure, Leray projection,
carrier recentering, and nonlinear normal-defect compatibility estimates remain open.
